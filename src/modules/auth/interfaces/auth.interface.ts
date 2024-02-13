import {
  ValidateUserDto,
  CreateAuthDto,
  LoginUserDto,
  ReadLoginUserDto,
} from 'src/modules/auth/dtos';

import { IBaseService } from 'src/common/base/base.interface';

import { ReadUserDto } from 'src/modules/users/dtos';

export const IAuthServiceType = 'IAuthServiceType';

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
