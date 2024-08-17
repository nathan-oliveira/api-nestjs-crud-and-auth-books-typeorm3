import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

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
    this.securityHelmet();
    return this.app;
  }

  private enableCors(): void {
    const config = Reflect.construct(CorsConfig, [this.configService]);
    this.app.enableCors(config.getConfig());
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
  }

  private enableSwagger = () => SwaggerConfig.handler(this.app);

  private securityHelmet() {
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'cdnjs.cloudflare.com'],
            objectSrc: ["'none'"],
          },
        },
        frameguard: {
          action: 'deny',
        },
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
        dnsPrefetchControl: false,
        hidePoweredBy: true,
        ieNoOpen: true,
        noSniff: true,
        xssFilter: true,
      }),
    );
  }
}

/**
 * Function securityHelmet
 *
 * @param contentSecurityPolicy     CSP ajuda a detectar e mitigar certos tipos de ataques, como XSS (Cross-Site Scripting) e data injection attacks.
 * @param hsts                      Define o header Strict-Transport-Security para 1 ano
 * @param dnsPrefetchControl        Desativa o controle de prefetch de DNS
 * @param hidePoweredBy             Remove o cabeçalho 'X-Powered-By'
 * @param ieNoOpen                  Define o header X-Download-Options para IE8+
 * @param noSniff                   Define o header X-Content-Type-Options para 'nosniff'
 * @param xssFilter                 Ativa o filtro XSS do navegador
 */
