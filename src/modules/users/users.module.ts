import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './shared/users.service';
import { UsersController } from './shared/users.controller';
import { UserEntity } from './entities/user.entity';
import { IUserUseCasesType } from './usecases/user.use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [{ provide: IUserUseCasesType, useClass: UsersService }],
  exports: [{ provide: IUserUseCasesType, useClass: UsersService }],
})
export class UsersModule {}
