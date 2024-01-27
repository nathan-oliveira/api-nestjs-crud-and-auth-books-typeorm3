import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import OrmConfigFactory from './config/orm.config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import { VersionController } from './modules/version/shared/version.controller';
import { VersionService } from './modules/version/shared/version.service';
import { BooksModule } from './modules/books/books.module';
import { ProfileModule } from './modules/profile/profile.module';

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
