import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as env from 'dotenv';
import { join } from 'path';

const configService = new ConfigService({ env: env.config() });

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: Number(configService.get('DATABASE_PORT')),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  schema: configService.get('DATABASE_NAME_SCHEMA'),
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [join(__dirname, '../modules/**/*.entity{.ts,.js}')], // fixme
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
