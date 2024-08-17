import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'src/common/base/base.service';
import { BookEntity } from 'src/modules/books/entities/book.entity';

import {
  ReadBookDto,
  CreateBookDto,
  UpdateBookDto,
  ReadPhotoDto,
} from 'src/modules/books/dtos';

import {
  removeImageStorage,
  updateImageStorage,
} from 'src/common/base/utils/storage-local';
import { IBookService } from '../interfaces/book-service.interface';

@Injectable()
export class BooksService
  extends BaseService<BookEntity>
  implements IBookService
{
  constructor(
    @InjectRepository(BookEntity)
    private readonly userRepository: Repository<BookEntity>,
  ) {
    super(userRepository, {
      filters: ['title', 'description'],
      relations: ['user'],
    });
  }

  async createAndUpload(
    createBookDto: CreateBookDto,
    imagePath: string,
  ): Promise<ReadBookDto> {
    try {
      return await this.create({
        ...createBookDto,
        fileUrl: imagePath,
      });
    } catch (error) {
      removeImageStorage(imagePath);
      throw error;
    }
  }

  async updateAndUpload(
    id: string,
    updateBookDto: UpdateBookDto,
    imagePath: string,
  ): Promise<ReadBookDto> {
    try {
      const book = await this.repository.preload({ ...updateBookDto, id });
      if (!book)
        throw new NotFoundException(this.i18n.translate('book.notFound'));
      if (imagePath) book.fileUrl = updateImageStorage(imagePath, book.fileUrl);
      return await this.repository.save(book);
    } catch (error) {
      removeImageStorage(imagePath);
      throw error;
    }
  }

  async removePhoto(id: string): Promise<void> {
    await this.destroyImage(id, 'fileUrl');
  }

  async getPhoto(id: string): Promise<ReadPhotoDto> {
    return await this.renderImage(id, 'fileUrl');
  }
}
