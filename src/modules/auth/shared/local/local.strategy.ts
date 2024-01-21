import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from 'src/modules/auth/shared/auth.service';
import { ValidateUserDto } from 'src/modules/auth/dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<ValidateUserDto | boolean> {
    return await this.authService.validateUser(username, password);
  }
}
