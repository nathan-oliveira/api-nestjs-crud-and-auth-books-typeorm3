import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { BookEntity } from 'src/modules/books/entities/book.entity';

export class ReadBookDto extends OmitType(BookEntity, ['fileUrl']) {
  @Exclude()
  fileUrl?: string;
}
