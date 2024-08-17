import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import {
  CreateAuthDto,
  LoginUserDto,
  ReadAuthDto,
  ReadLoginUserDto,
} from 'src/modules/auth/dtos';

import { Rule } from 'src/modules/auth/enums/rule.enum';
import { JwtAuth } from 'src/common/decorators/jwt-auth.decorator';
import { UserAuth } from 'src/common/decorators/user-auth.decorator';

import { LocalAuthGuard } from './local/local-auth.guard';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createAuthDto: CreateAuthDto): Promise<ReadAuthDto> {
    const user = await this.authService.create(createAuthDto);
    return plainToClass(ReadAuthDto, user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserAuth() user: LoginUserDto): Promise<ReadLoginUserDto> {
    const result = await this.authService.login(user);
    return plainToClass(ReadLoginUserDto, result);
  }

  @JwtAuth(Rule.USER, Rule.ADMIN)
  @Post('logout')
  async logout(@UserAuth() { id }: LoginUserDto): Promise<void> {
    return this.authService.logout(id);
  }
}
