import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.config';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
