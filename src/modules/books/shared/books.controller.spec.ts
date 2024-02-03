import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookEntity } from 'src/modules/books/entities/book.entity';

import { IBookUseCasesType, IBookUseCases } from '../usecases/book.use-cases';

import {
  mockCreateBookDto,
  mockFileMulter,
  mockMethodsRepository,
  mockQueryParams,
  mockReadBookDto,
  mockStealableFile,
  mockRequest,
  mockResponse,
  mockUpdateBookDto,
} from 'src/../test/mock';

describe('BooksController', () => {
  let controller: BooksController;
  let service: IBookUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
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

    controller = module.get<BooksController>(BooksController);
    service = module.get<IBookUseCases>(IBookUseCasesType);
  });

  it('controller must be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'create')
        .mockResolvedValueOnce(result);

      const req = mockRequest();
      const book = mockCreateBookDto();
      const photo = mockFileMulter();

      await controller.create(req, book, photo);

      expect(findSpy).toHaveBeenCalledWith(req, book, photo);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadBookDto();

      const findSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(result);

      const req = mockRequest();
      const book = mockCreateBookDto();
      const photo = mockFileMulter();

      await controller.create(req, book, null);

      expect(findSpy).not.toHaveBeenCalledWith(req, book, photo);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadBookDto();

      jest.spyOn(controller, 'create').mockResolvedValueOnce(result);

      const req = mockRequest();
      const book = mockCreateBookDto();
      const photo = mockFileMulter();

      expect(await controller.create(req, book, photo)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      const req = mockRequest();
      const book = mockCreateBookDto();
      const photo = mockFileMulter();

      expect(controller.create(req, book, photo)).rejects.toThrow(new Error());
    });
  });

  describe('findAll', () => {
    it('must call the method and return the correct parameters', async () => {
      const book = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'findAll')
        .mockResolvedValueOnce([book]);

      const response = mockResponse();
      const queryParams = mockQueryParams();

      await controller.findAll(response, queryParams);

      expect(findSpy).toHaveBeenCalledWith(response, queryParams);
    });

    it('should call the method and return invalid parameters', async () => {
      const book = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'findAll')
        .mockResolvedValueOnce([book]);

      const response = mockResponse();
      const queryParams = mockQueryParams();

      await controller.findAll(response, null);

      expect(findSpy).not.toHaveBeenCalledWith(response, queryParams);
    });

    it('should call the method and return the result', async () => {
      const book = mockReadBookDto();

      jest.spyOn(controller, 'findAll').mockResolvedValueOnce([book]);

      const response = mockResponse();
      const queryParams = mockQueryParams();

      expect(await controller.findAll(response, queryParams)).toEqual([book]);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'findAll').mockRejectedValueOnce(new Error());

      const response = mockResponse();
      const queryParams = mockQueryParams();

      expect(controller.findAll(response, queryParams)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('getPhoto', () => {
    it('must call the method and return the correct parameters', async () => {
      const file = mockStealableFile();

      const findSpy = jest
        .spyOn(controller, 'getPhoto')
        .mockResolvedValueOnce(file);

      const response = mockResponse();

      await controller.getPhoto('123', response);

      expect(findSpy).toHaveBeenCalledWith('123', response);
    });

    it('should call the method and return invalid parameters', async () => {
      const file = mockStealableFile();

      const findSpy = jest
        .spyOn(controller, 'getPhoto')
        .mockResolvedValueOnce(file);

      const response = mockResponse();

      await controller.getPhoto(null, response);

      expect(findSpy).not.toHaveBeenCalledWith('123', response);
    });

    it('should call the method and return the result', async () => {
      const file = mockStealableFile();

      jest.spyOn(controller, 'getPhoto').mockResolvedValueOnce(file);

      const response = mockResponse();

      expect(await controller.getPhoto('123', response)).toEqual(file);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'getPhoto').mockRejectedValueOnce(new Error());

      const response = mockResponse();

      expect(controller.getPhoto('123', response)).rejects.toThrow(new Error());
    });
  });

  describe('findOne', () => {
    it('must call the method and return the correct parameters', async () => {
      const book = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'findOne')
        .mockResolvedValueOnce(book);

      await controller.findOne('123');

      expect(findSpy).toHaveBeenCalledWith('123');
    });

    it('should call the method and return invalid parameters', async () => {
      const book = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'findOne')
        .mockResolvedValueOnce(book);

      await controller.findOne(null);

      expect(findSpy).not.toHaveBeenCalledWith('123');
    });

    it('should call the method and return the result', async () => {
      const book = mockReadBookDto();

      jest.spyOn(controller, 'findOne').mockResolvedValueOnce(book);

      expect(await controller.findOne('123')).toEqual(book);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'findOne').mockRejectedValueOnce(new Error());

      expect(controller.findOne('123')).rejects.toThrow(new Error());
    });
  });

  describe('update', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'update')
        .mockResolvedValueOnce(result);

      const book = mockUpdateBookDto();
      const photo = mockFileMulter();

      await controller.update('123', book, photo);

      expect(findSpy).toHaveBeenCalledWith('123', book, photo);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'update')
        .mockResolvedValueOnce(result);

      await controller.update(null, null, null);

      const book = mockUpdateBookDto();
      const photo = mockFileMulter();

      expect(findSpy).not.toHaveBeenCalledWith('123', book, photo);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadBookDto();

      jest.spyOn(controller, 'update').mockResolvedValueOnce(result);

      const book = mockUpdateBookDto();
      const photo = mockFileMulter();

      expect(await controller.update('123', book, photo)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'update').mockRejectedValueOnce(new Error());

      const book = mockUpdateBookDto();
      const photo = mockFileMulter();

      expect(controller.update('123', book, photo)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('disableOrActivate', () => {
    it('must call the method and return the correct parameters', async () => {
      const book = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'disableOrActivate')
        .mockResolvedValueOnce(book);

      await controller.disableOrActivate('123');

      expect(findSpy).toHaveBeenCalledWith('123');
    });

    it('should call the method and return invalid parameters', async () => {
      const book = mockReadBookDto();

      const findSpy = jest
        .spyOn(controller, 'disableOrActivate')
        .mockResolvedValueOnce(book);

      await controller.disableOrActivate(null);

      expect(findSpy).not.toHaveBeenCalledWith('123');
    });

    it('should call the method and return the result', async () => {
      const book = mockReadBookDto();

      jest.spyOn(controller, 'disableOrActivate').mockResolvedValueOnce(book);

      expect(await controller.disableOrActivate('123')).toEqual(book);
    });

    it('should call the method and return the errors', async () => {
      jest
        .spyOn(controller, 'disableOrActivate')
        .mockRejectedValueOnce(new Error());

      expect(controller.disableOrActivate('123')).rejects.toThrow(new Error());
    });
  });

  describe('removePhoto', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'removePhoto')
        .mockResolvedValueOnce(void 0);

      await controller.removePhoto('123');

      expect(findSpy).toHaveBeenCalledWith('123');
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'removePhoto')
        .mockResolvedValueOnce(void 0);

      await controller.removePhoto(null);

      expect(findSpy).not.toHaveBeenCalledWith('1');
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(controller, 'removePhoto').mockResolvedValueOnce(void 0);

      expect(await controller.removePhoto('1')).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'removePhoto').mockRejectedValueOnce(new Error());

      await expect(controller.removePhoto('1')).rejects.toThrow(new Error());
    });
  });

  describe('remove', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'remove')
        .mockResolvedValueOnce(void 0);

      await controller.remove('123');

      expect(findSpy).toHaveBeenCalledWith('123');
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'remove')
        .mockResolvedValueOnce(void 0);

      await controller.remove(null);

      expect(findSpy).not.toHaveBeenCalledWith('1');
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(controller, 'remove').mockResolvedValueOnce(void 0);

      expect(await controller.remove('1')).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'remove').mockRejectedValueOnce(new Error());

      await expect(controller.remove('1')).rejects.toThrow(new Error());
    });
  });
});
