import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { isUUID } from 'class-validator';

export const validateId = (id: string) => {
  if (!isUUID(id)) {
    throw new HttpException(
      'Identification provided is invalid.',
      HttpStatus.BAD_REQUEST,
    );
  }

  return id;
};

export const ParamId = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const id = context.switchToHttp().getRequest().params.id;
    return validateId(id);
  },
);
