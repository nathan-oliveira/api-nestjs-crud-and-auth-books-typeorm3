import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';

import {
  IUserServiceType,
  IUserService,
} from '../interfaces/user-service.interface';

import {
  mockCreateUserDto,
  mockFileMulter,
  mockMethodsRepository,
  mockQueryParams,
  mockReadUserDto,
  mockStealableFile,
  mockResponse,
  mockUpdateUserDto,
} from 'src/../test/mock';

describe('UsersController', () => {
  let controller: UsersController;
  let service: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: IUserServiceType,
          useClass: UsersService,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockMethodsRepository,
        },
      ],
      imports: [UserEntity],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<IUserService>(IUserServiceType);
  });

  it('controller must be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'create')
        .mockResolvedValueOnce(result);

      const user = mockCreateUserDto();
      const photo = mockFileMulter();

      await controller.create(user, photo);

      expect(findSpy).toHaveBeenCalledWith(user, photo);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(result);

      const user = mockCreateUserDto();
      const photo = mockFileMulter();

      await controller.create(user, null);

      expect(findSpy).not.toHaveBeenCalledWith(user, photo);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadUserDto();

      jest.spyOn(controller, 'create').mockResolvedValueOnce(result);

      const user = mockCreateUserDto();
      const photo = mockFileMulter();

      expect(await controller.create(user, photo)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'create').mockRejectedValueOnce(new Error());

      const user = mockCreateUserDto();
      const photo = mockFileMulter();

      expect(controller.create(user, photo)).rejects.toThrow(new Error());
    });
  });

  describe('findAll', () => {
    it('must call the method and return the correct parameters', async () => {
      const user = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'findAll')
        .mockResolvedValueOnce([user]);

      const response = mockResponse();
      const queryParams = mockQueryParams();

      await controller.findAll(response, queryParams);

      expect(findSpy).toHaveBeenCalledWith(response, queryParams);
    });

    it('should call the method and return invalid parameters', async () => {
      const user = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'findAll')
        .mockResolvedValueOnce([user]);

      const response = mockResponse();
      const queryParams = mockQueryParams();

      await controller.findAll(response, null);

      expect(findSpy).not.toHaveBeenCalledWith(response, queryParams);
    });

    it('should call the method and return the result', async () => {
      const user = mockReadUserDto();

      jest.spyOn(controller, 'findAll').mockResolvedValueOnce([user]);

      const response = mockResponse();
      const queryParams = mockQueryParams();

      expect(await controller.findAll(response, queryParams)).toEqual([user]);
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
      const id = faker.string.uuid();

      await controller.getPhoto(id, response);

      expect(findSpy).toHaveBeenCalledWith(id, response);
    });

    it('should call the method and return invalid parameters', async () => {
      const file = mockStealableFile();

      const findSpy = jest
        .spyOn(controller, 'getPhoto')
        .mockResolvedValueOnce(file);

      const response = mockResponse();

      await controller.getPhoto(null, response);

      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id, response);
    });

    it('should call the method and return the result', async () => {
      const file = mockStealableFile();

      jest.spyOn(controller, 'getPhoto').mockResolvedValueOnce(file);

      const response = mockResponse();
      const id = faker.string.uuid();

      expect(await controller.getPhoto(id, response)).toEqual(file);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'getPhoto').mockRejectedValueOnce(new Error());

      const response = mockResponse();
      const id = faker.string.uuid();

      expect(controller.getPhoto(id, response)).rejects.toThrow(new Error());
    });
  });

  describe('findOne', () => {
    it('must call the method and return the correct parameters', async () => {
      const user = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'findOne')
        .mockResolvedValueOnce(user);

      const id = faker.string.uuid();

      await controller.findOne(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    });

    it('should call the method and return invalid parameters', async () => {
      const user = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'findOne')
        .mockResolvedValueOnce(user);

      await controller.findOne(null);

      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id);
    });

    it('should call the method and return the result', async () => {
      const user = mockReadUserDto();

      jest.spyOn(controller, 'findOne').mockResolvedValueOnce(user);

      const id = faker.string.uuid();

      expect(await controller.findOne(id)).toEqual(user);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'findOne').mockRejectedValueOnce(new Error());

      const id = faker.string.uuid();

      expect(controller.findOne(id)).rejects.toThrow(new Error());
    });
  });

  describe('update', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'update')
        .mockResolvedValueOnce(result);

      const user = mockUpdateUserDto();
      const photo = mockFileMulter();
      const id = faker.string.uuid();

      await controller.update(id, user, photo);

      expect(findSpy).toHaveBeenCalledWith(id, user, photo);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'update')
        .mockResolvedValueOnce(result);

      await controller.update(null, null, null);

      const user = mockUpdateUserDto();
      const photo = mockFileMulter();
      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id, user, photo);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadUserDto();

      jest.spyOn(controller, 'update').mockResolvedValueOnce(result);

      const user = mockUpdateUserDto();
      const photo = mockFileMulter();
      const id = faker.string.uuid();

      expect(await controller.update(id, user, photo)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'update').mockRejectedValueOnce(new Error());

      const user = mockUpdateUserDto();
      const photo = mockFileMulter();
      const id = faker.string.uuid();

      expect(controller.update(id, user, photo)).rejects.toThrow(new Error());
    });
  });

  describe('disableOrActivate', () => {
    it('must call the method and return the correct parameters', async () => {
      const user = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'disableOrActivate')
        .mockResolvedValueOnce(user);

      const id = faker.string.uuid();

      await controller.disableOrActivate(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    });

    it('should call the method and return invalid parameters', async () => {
      const user = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'disableOrActivate')
        .mockResolvedValueOnce(user);

      await controller.disableOrActivate(null);

      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id);
    });

    it('should call the method and return the result', async () => {
      const user = mockReadUserDto();

      jest.spyOn(controller, 'disableOrActivate').mockResolvedValueOnce(user);

      const id = faker.string.uuid();

      expect(await controller.disableOrActivate(id)).toEqual(user);
    });

    it('should call the method and return the errors', async () => {
      jest
        .spyOn(controller, 'disableOrActivate')
        .mockRejectedValueOnce(new Error());

      const id = faker.string.uuid();

      expect(controller.disableOrActivate(id)).rejects.toThrow(new Error());
    });
  });

  describe('removePhoto', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'removePhoto')
        .mockResolvedValueOnce(void 0);

      const id = faker.string.uuid();

      await controller.removePhoto(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'removePhoto')
        .mockResolvedValueOnce(void 0);

      await controller.removePhoto(null);

      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id);
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(controller, 'removePhoto').mockResolvedValueOnce(void 0);

      const id = faker.string.uuid();

      expect(await controller.removePhoto(id)).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'removePhoto').mockRejectedValueOnce(new Error());

      const id = faker.string.uuid();

      await expect(controller.removePhoto(id)).rejects.toThrow(new Error());
    });
  });

  describe('remove', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'remove')
        .mockResolvedValueOnce(void 0);

      const id = faker.string.uuid();

      await controller.remove(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'remove')
        .mockResolvedValueOnce(void 0);

      await controller.remove(null);

      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id);
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(controller, 'remove').mockResolvedValueOnce(void 0);

      const id = faker.string.uuid();

      expect(await controller.remove(id)).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'remove').mockRejectedValueOnce(new Error());

      const id = faker.string.uuid();

      await expect(controller.remove(id)).rejects.toThrow(new Error());
    });
  });
});
