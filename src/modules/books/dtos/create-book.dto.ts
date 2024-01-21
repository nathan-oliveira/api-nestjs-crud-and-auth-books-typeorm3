import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    type: String,
    description: 'Field for book title',
  })
  @IsNotEmpty({ message: 'The title cannot be empty!' })
  @MaxLength(255, {
    message: 'The title must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'The title must be a string' })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Field for book description',
  })
  @IsNotEmpty({ message: 'The description cannot be empty!' })
  @IsString({ message: 'The description must be a string' })
  description: string;

  @ApiProperty({
    type: String,
    description: 'Field for book userId',
  })
  @IsOptional()
  @IsUUID('4', { message: 'User ID is invalid!' })
  userId: string;
}
