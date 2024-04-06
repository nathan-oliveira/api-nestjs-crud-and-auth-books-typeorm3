import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

import { LoginUserDto } from 'src/modules/auth/dtos';

export const UserAuth = createParamDecorator((data: unknown, req: Request) => {
  return <LoginUserDto>req.user;
});