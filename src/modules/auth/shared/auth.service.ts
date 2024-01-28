import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/modules/users/shared/users.service';

import {
  ValidateUserDto,
  CreateAuthDto,
  LoginUserDto,
  ReadLoginUserDto,
} from 'src/modules/auth/dtos';

import { CreateUserDto, ReadUserDto } from 'src/modules/users/dtos';
import { RedisService } from 'src/config/redis.config';
import {
  IUserUseCasesType,
  IUserUseCases
} from 'src/modules/users/usecases/user.use-cases';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserUseCasesType)
    private readonly usersService: IUserUseCases,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<ValidateUserDto | boolean> {
    const user = await this.usersService.findUserByUserName(username);

    if (!user) {
      throw new HttpException(
        'Invalid username and/or password. Please try again!',
        HttpStatus.FORBIDDEN,
      );
    }

    if (!user.active) {
      throw new HttpException(
        'User is disabled. Please contact the admin!',
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordIsValid = await this.compareHash(password, user.password);
    if (!passwordIsValid) {
      throw new HttpException(
        'Invalid username and/or password. Please try again!',
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
