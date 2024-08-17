import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compareHash } from 'src/common/utils/bcrypt';

import {
  ValidateUserDto,
  CreateAuthDto,
  LoginUserDto,
  ReadLoginUserDto,
} from 'src/modules/auth/dtos';

import { CreateUserDto, ReadUserDto } from 'src/modules/users/dtos';
import { RedisService } from 'src/common/redis/redis.config';

import { IAuthService } from '../interfaces/auth-service.interface';
import { I18nGlobalService } from 'src/common/i18n/i18n-global.service';
import { UsersService } from 'src/modules/users/shared/users.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
    private readonly i18n: I18nGlobalService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ValidateUserDto | boolean> {
    const user = await this.usersService.findUserByUserName(username);

    if (!user) {
      throw new HttpException(
        this.i18n.translate('auth.invalidLogin'),
        HttpStatus.FORBIDDEN,
      );
    }

    if (!user.active) {
      throw new HttpException(
        this.i18n.translate('auth.disabledUser'),
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordIsValid = await compareHash(password, user.password);
    if (!passwordIsValid) {
      throw new HttpException(
        this.i18n.translate('auth.invalidLogin'),
        HttpStatus.FORBIDDEN,
      );
    }

    const { id, name, rule, active } = user;
    return { id, name, rule, active };
  }

  async userIsDisabled(id: string): Promise<void | boolean> {
    const user = await this.usersService.findById(id);
    if (!user.active) return true;
  }

  async create(createAuthDto: CreateAuthDto): Promise<ReadUserDto> {
    const user = { ...createAuthDto, rule: 1 } as CreateUserDto;
    return this.usersService.createAndUpload(user, null);
  }

  async login(loginUserDto: LoginUserDto): Promise<ReadLoginUserDto> {
    const { id, rule, active } = loginUserDto;

    const token = this.jwtService.sign({ sub: id, rule, active });
    const { exp: expirationTime } = this.jwtService.verify(token);

    const result = {
      token,
      userId: id,
      active,
      rule,
      expirationTime,
    };

    await this.redis.set(id, JSON.stringify(result), 'EX', 43200);
    return result;
  }

  async logout(id: string): Promise<void> {
    await this.redis.del(id);
  }
}
