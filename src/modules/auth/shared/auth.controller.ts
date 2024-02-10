import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as RequestExpress } from 'express';
import { plainToClass } from 'class-transformer';

import {
  CreateAuthDto,
  LoginUserDto,
  ReadAuthDto,
  ReadLoginUserDto,
} from 'src/modules/auth/dtos';

import { Rule } from 'src/modules/auth/enums/rule.enum';
import { LocalAuthGuard } from './local/local-auth.guard';
import { JwtAuth } from 'src/common/decorators/jwt-auth.decorator';

import { IAuthUseCasesType, IAuthUseCases } from '../usecases/auth.use-cases';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(IAuthUseCasesType)
    private readonly authService: IAuthUseCases,
  ) {}

  @Post('signup')
  async create(@Body() createAuthDto: CreateAuthDto): Promise<ReadAuthDto> {
    const user = await this.authService.create(createAuthDto);
    return plainToClass(ReadAuthDto, user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestExpress): Promise<ReadLoginUserDto> {
    const { id, active, rule } = req.user as LoginUserDto;
    const result = await this.authService.login({ id, active, rule });
    return plainToClass(ReadLoginUserDto, result);
  }

  @JwtAuth(Rule.USER, Rule.ADMIN)
  @Post('logout')
  async logout(@Request() req: RequestExpress): Promise<void> {
    // const authHeader = req.headers.authorization;
    // const [, token] = authHeader.split(' ');
    const user = req.user as LoginUserDto;
    return this.authService.logout(user.id);
  }
}
