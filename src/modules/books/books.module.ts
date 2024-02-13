import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from './shared/books.service';
import { BooksController } from './shared/books.controller';
import { BookEntity } from './entities/book.entity';
import { IBookServiceType } from './interfaces/book-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [{ provide: IBookServiceType, useClass: BooksService }],
})
export class BooksModule {}
