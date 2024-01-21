import { ApiProperty } from '@nestjs/swagger';

import { ReadStream } from 'typeorm/platform/PlatformTools';

export class ReadPhotoDto {
  @ApiProperty({
    type: String,
    description: 'Photo',
  })
  file: ReadStream;

  @ApiProperty({
    type: String,
    description: 'Mimetype',
  })
  mimetype: string;
}
