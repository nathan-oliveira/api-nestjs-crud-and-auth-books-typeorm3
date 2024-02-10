import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from 'src/modules/auth/shared/auth.service';
import { ValidateUserDto } from 'src/modules/auth/dtos';
import {
  IAuthUseCases,
  IAuthUseCasesType,
} from '../../usecases/auth.use-cases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IAuthUseCasesType)
    private readonly authService: IAuthUseCases,
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
