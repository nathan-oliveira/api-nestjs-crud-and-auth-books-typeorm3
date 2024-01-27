import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
// import * as bodyParser from 'body-parser';

import CorsConfig from './cors.config';
import SwaggerConfig from './swagger.config';

import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

export class AppConfig {
  private app: NestExpressApplication;
  private configService: ConfigService;

  constructor(
    readonly appNest: NestExpressApplication,
    readonly configServiceNest: ConfigService,
  ) {
    this.app = appNest;
    this.configService = configServiceNest;
  }

  createApp(): NestExpressApplication {
    this.enableCors();
    this.setGlobalConfigs();
    this.enableSwagger();
    this.removeExpressFromResponse();
    return this.app;
  }

  private enableCors(): void {
    const config = new CorsConfig(this.configService).getConfig();
    this.app.enableCors(config);
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
