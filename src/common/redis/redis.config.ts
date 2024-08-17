import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  private readonly logger = new Logger(RedisService.name);
  constructor(readonly configService: ConfigService) {
    super({
      host: configService.get<string>('REDIS_HOST'),
      password: configService.get<string>('REDIS_PASSWORD'),
      port: configService.get<number>('REDIS_PORT', { infer: true }),
    });

    super.on('error', function (err) {
      this.logger.log('Error on Redis');
      console.log(err);
      process.exit(1);
    });

    super.on('connect', function () {
      this.logger.log('Redis connected!');
    });
  }
}
