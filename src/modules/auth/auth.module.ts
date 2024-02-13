import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/modules/users/users.module';
import { RedisService } from 'src/config/redis.config';
import JwtConfigFactory from 'src/config/jwt.config';

import { AuthController } from './shared/auth.controller';
import { AuthService } from './shared/auth.service';
import { LocalStrategy } from './shared/local/local.strategy';
import { JwtStrategy } from './shared/jwt/jwt.strategy';
import { IAuthServiceType } from './interfaces/auth.interface';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JwtConfigFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [
    RedisService,
    { provide: IAuthServiceType, useClass: AuthService },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
