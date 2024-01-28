import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from './shared/books.service';
import { BooksController } from './shared/books.controller';
import { BookEntity } from './entities/book.entity';
import { IBookUseCasesType } from './usecases/book.use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [{ provide: IBookUseCasesType, useClass: BooksService }],
})
export class BooksModule {}
