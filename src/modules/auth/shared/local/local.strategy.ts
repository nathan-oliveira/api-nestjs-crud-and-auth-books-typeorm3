import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from 'src/modules/auth/shared/auth.service';
import { ValidateUserDto } from 'src/modules/auth/dtos';
import {
  IAuthService,
  IAuthServiceType,
} from '../../interfaces/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IAuthServiceType)
    private readonly authService: IAuthService,
  ) {
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
