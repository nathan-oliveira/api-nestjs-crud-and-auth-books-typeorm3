import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dtos';

export class CreateAuthDto extends PartialType(
  OmitType(CreateUserDto, ['rule']),
) {}
