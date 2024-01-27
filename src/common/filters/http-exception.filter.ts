import { Response } from 'express';
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Catch,
} from '@nestjs/common';

import { errorMessagesPostgresql } from 'src/database/errors/error-messages';

import { HttpExceptionDto } from './dto/http-exception.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpExceptionDto, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message =
      typeof exception.response !== 'object'
        ? exception.message
        : exception.response.message;

    if (exception.code && errorMessagesPostgresql[exception.code]) {
      message = errorMessagesPostgresql[exception.code];
    }

    const statusCode = exception.status || HttpStatus.BAD_REQUEST;
    return response.status(statusCode).json({ statusCode, message });
  }
}
