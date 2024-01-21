import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/modules/users/users.module';

import { AuthController } from './shared/auth.controller';
import { AuthService } from './shared/auth.service';
import { LocalStrategy } from './shared/local/local.strategy';
import { JwtStrategy } from './shared/jwt/jwt.strategy';
import { secretKey } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
