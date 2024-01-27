import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { NestApplicationOptions } from '@nestjs/common';

import { AppModule } from './modules/app.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<number>('APP_PORT', { infer: true });
  const nodeEnv = configService.get<string>('NODE_ENV');

  const nestApp: NestExpressApplication = await NestFactory.create(AppModule, {
    logger: nodeEnv !== 'development' ? ['error'] : true,
  } as NestApplicationOptions);

  const app = new AppConfig(nestApp, configService).createApp();
  await app.listen(port, () => console.log(`[+] http://localhost:${port}`));
}

bootstrap();
