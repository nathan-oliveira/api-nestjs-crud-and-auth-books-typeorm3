import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import OrmConfigFactory from 'src/config/orm.config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { VersionController } from './version/shared/version.controller';
import { VersionService } from './version/shared/version.service';
import { BooksModule } from './books/books.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: OrmConfigFactory,
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    BooksModule,
  ],
  controllers: [VersionController],
  providers: [VersionService],
})
export class AppModule {}
