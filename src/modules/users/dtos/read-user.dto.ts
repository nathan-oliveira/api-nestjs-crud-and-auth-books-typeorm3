import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { UserEntity } from 'src/modules/users/entities/user.entity';

export class ReadUserDto extends OmitType(UserEntity, ['photo', 'password']) {
  @Exclude()
  photo?: string;

  @Exclude()
  password?: string;
}
