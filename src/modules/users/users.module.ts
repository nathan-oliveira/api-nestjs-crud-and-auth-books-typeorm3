import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './shared/users.service';
import { UsersController } from './shared/users.controller';
import { UserEntity } from './entities/user.entity';
import { IUserServiceType } from './interfaces/user.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [{ provide: IUserServiceType, useClass: UsersService }],
  exports: [{ provide: IUserServiceType, useClass: UsersService }],
})
export class UsersModule {}
