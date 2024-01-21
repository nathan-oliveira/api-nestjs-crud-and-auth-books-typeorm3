import { ApiProperty } from '@nestjs/swagger';

export class ReadVersionDto {
  @ApiProperty({
    description: 'Current version of the application',
    type: String,
  })
  currentVersion: string;

  @ApiProperty({
    description: 'Application launch date',
    type: Date,
  })
  startupDate: Date;
}
