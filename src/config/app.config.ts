import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
// import * as bodyParser from 'body-parser';

import CorsConfig from './cors.config';
import SwaggerConfig from './swagger.config';

import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

export class AppConfig {
  public app: NestExpressApplication;

  constructor(readonly appNest: NestExpressApplication) {
    this.app = appNest;
    this.enableCors();
    this.setGlobalConfigs();
    this.enableSwagger();
    this.removeExpressFromResponse();
  }

  private enableCors(): void {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      this.app.enableCors({ exposedHeaders: CorsConfig.exposedHeaders });
    } else {
      this.app.enableCors(CorsConfig);
    }
  }

  private setGlobalConfigs(): void {
    this.app.setGlobalPrefix('api');
    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useBodyParser('json', { limit: '100mb' });
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    // this.app.use(bodyParser.json({ limit: '100mb' }));
    // this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  }

  private enableSwagger = () => SwaggerConfig.handler(this.app);

  private removeExpressFromResponse() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.removeHeader('X-Powered-By');
      next();
    });
  }
}
