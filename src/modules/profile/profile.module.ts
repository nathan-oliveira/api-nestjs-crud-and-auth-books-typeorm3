import { Module } from '@nestjs/common';

import { UsersModule } from 'src/modules/users/users.module';

import { ProfileController } from './shared/profile.controller';

@Module({
  imports: [UsersModule],
  controllers: [ProfileController],
  providers: [],
})
export class ProfileModule {}
