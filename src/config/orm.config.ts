import { ConfigService } from '@nestjs/config';

export default async (configService: ConfigService) => ({
  type: configService.get('DATABASE_TYPE'),
  host: configService.get('DATABASE_HOST'),
  port: Number(configService.get('DATABASE_PORT')),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  schema: configService.get('DATABASE_NAME_SCHEMA'),
  synchronize: false,
  migrationsRun: true,
  autoLoadEntities: true,
  logging: false,
  entities: [__dirname + '/src/modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
});
