import {
  ValidateUserDto,
  CreateAuthDto,
  LoginUserDto,
  ReadLoginUserDto,
} from 'src/modules/auth/dtos';

import { ReadUserDto } from 'src/modules/users/dtos';

export interface IAuthService {
  validateUser: (
    username: string,
    password: string,
  ) => Promise<ValidateUserDto | boolean>;

  userIsDisabled: (id: string) => Promise<void | boolean>;

  create: (createAuthDto: CreateAuthDto) => Promise<ReadUserDto>;

  login: (loginUserDto: LoginUserDto) => Promise<ReadLoginUserDto>;

  logout: (id: string) => Promise<void>;
}
