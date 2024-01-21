import { ApiProperty } from '@nestjs/swagger';

export class ReadLoginUserDto {
  @ApiProperty({
    description: 'Jwt token for user session',
    type: String,
  })
  token: string;

  @ApiProperty({
    description: 'User identifier registration in the database',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'Rule is to define the user access level',
    type: String,
  })
  rule: number;

  @ApiProperty({
    description: 'Identify whether the user is active',
    type: String,
  })
  active: boolean;

  @ApiProperty({
    description: 'Expiration time of the token generated at login',
    type: String,
  })
  expirationTime: boolean;
}
