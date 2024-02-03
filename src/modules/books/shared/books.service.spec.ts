import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BooksService } from './books.service';
import { BookEntity } from 'src/modules/books/entities/book.entity';

import { IBookUseCasesType, IBookUseCases } from '../usecases/book.use-cases';

import {
  mockCreateBookDto,
  mockMethodsRepository,
  mockReadBookDto,
  mockReadPhotoDto,
  mockUpdateBookDto,
} from 'src/../test/mock';

describe('BooksService', () => {
  let service: IBookUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IBookUseCasesType,
          useClass: BooksService,
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: mockMethodsRepository,
        },
      ],
      imports: [BookEntity],
    }).compile();

    service = module.get<IBookUseCases>(IBookUseCasesType);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAndUpload', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadBookDto();

      const findSpy = jest
        .spyOn(service, 'createAndUpload')
        .mockResolvedValueOnce(result);

      const book = mockCreateBookDto();

      await service.createAndUpload(book, 'url');

      expect(findSpy).toHaveBeenCalledWith(book, 'url');
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadBookDto();

      const findSpy = jest
        .spyOn(service, 'createAndUpload')
        .mockResolvedValueOnce(result);

      await service.createAndUpload(null, null);

      const book = mockCreateBookDto();

      expect(findSpy).not.toHaveBeenCalledWith(book, 'url');
    });

    it('should call the method and return the result', async () => {
      const result = mockReadBookDto();

      jest.spyOn(service, 'createAndUpload').mockResolvedValueOnce(result);

      const book = mockCreateBookDto();

      expect(await service.createAndUpload(book, 'url')).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(service, 'createAndUpload').mockRejectedValueOnce(new Error());

      const book = mockCreateBookDto();

      expect(service.createAndUpload(book, 'url')).rejects.toThrow(new Error());
    });
  });

  describe('updateAndUpload', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadBookDto();

      const findSpy = jest
        .spyOn(service, 'updateAndUpload')
        .mockResolvedValueOnce(result);

      const book = mockUpdateBookDto();

      await service.updateAndUpload('123', book, 'url');

      expect(findSpy).toHaveBeenCalledWith('123', book, 'url');
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadBookDto();

      const findSpy = jest
        .spyOn(service, 'updateAndUpload')
        .mockResolvedValueOnce(result);

      await service.updateAndUpload(null, null, null);

      const book = mockUpdateBookDto();

      expect(findSpy).not.toHaveBeenCalledWith('123', book, 'url');
    });

    it('should call the method and return the result', async () => {
      const result = mockReadBookDto();

      jest.spyOn(service, 'updateAndUpload').mockResolvedValueOnce(result);

      const book = mockUpdateBookDto();

      expect(await service.updateAndUpload('123', book, 'url')).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(service, 'updateAndUpload').mockRejectedValueOnce(new Error());

      const book = mockUpdateBookDto();

      expect(service.updateAndUpload('123', book, 'url')).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('removePhoto', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(service, 'removePhoto')
        .mockResolvedValueOnce(void 0);

      await service.removePhoto('123');

      expect(findSpy).toHaveBeenCalledWith('123');
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(service, 'removePhoto')
        .mockResolvedValueOnce(void 0);

      await service.removePhoto(null);

      expect(findSpy).not.toHaveBeenCalledWith('1');
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(service, 'removePhoto').mockResolvedValueOnce(void 0);

      expect(await service.removePhoto('1')).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(service, 'removePhoto').mockRejectedValueOnce(new Error());

      await expect(service.removePhoto('1')).rejects.toThrow(new Error());
    });
  });

  describe('getPhoto', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadPhotoDto();

      const findSpy = jest
        .spyOn(service, 'getPhoto')
        .mockResolvedValueOnce(result);

      await service.getPhoto('123');

      expect(findSpy).toHaveBeenCalledWith('123');
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadPhotoDto();

      const findSpy = jest
        .spyOn(service, 'getPhoto')
        .mockResolvedValueOnce(result);

      await service.getPhoto(null);

      expect(findSpy).not.toHaveBeenCalledWith('123');
    });

    it('should call the method and return the result', async () => {
      const result = mockReadPhotoDto();

      jest.spyOn(service, 'getPhoto').mockResolvedValueOnce(result);

      expect(await service.getPhoto('123')).toEqual(result);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(service, 'getPhoto').mockRejectedValueOnce(new Error());

      expect(service.getPhoto('123')).rejects.toThrow(new Error());
    });
  });
});
