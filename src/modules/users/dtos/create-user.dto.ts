import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Field for the user full name',
  })
  @IsNotEmpty({ message: 'Name cannot be empty!' })
  @MaxLength(255, {
    message: 'Name must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Username field for the user to log in',
  })
  @IsNotEmpty({ message: 'Username cannot be empty!' })
  @MaxLength(255, {
    message: 'Username must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Email field for the user to recover the account',
  })
  @IsNotEmpty({ message: 'Email cannot be empty!' })
  @MaxLength(255, {
    message: 'Email must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password for the user to log into the account',
  })
  @IsNotEmpty({ message: 'Password cannot be empty!' })
  @MaxLength(255, {
    message: 'Password must contain a maximum of 255 characters!',
  })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Rule is to define the user access level',
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  rule: number;
}
