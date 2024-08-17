import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/modules/users/users.module';
import JwtConfigFactory from 'src/config/jwt.config';

import { AuthController } from './shared/auth.controller';
import { AuthService } from './shared/auth.service';
import { LocalStrategy } from './shared/local/local.strategy';
import { JwtStrategy } from './shared/jwt/jwt.strategy';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    RedisModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JwtConfigFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
