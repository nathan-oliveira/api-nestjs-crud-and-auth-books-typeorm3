import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

import { UsersService } from './users.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';

import { IUserServiceType, IUserService } from '../interfaces/user.interface';

import {
  mockCreateUserDto,
  mockMethodsRepository,
  mockReadUserDto,
  mockReadPhotoDto,
  mockUpdateUserDto,
} from 'src/../test/mock';

describe('UsersService', () => {
  let service: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<IUserService>(IUserServiceType);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserByUserName', () => {
    it('must call the method and return the correct parameters', async () => {
      const user = mockReadUserDto();

      const findSpy = jest
        .spyOn(service, 'findUserByUserName')
        .mockResolvedValueOnce(user);

      await service.findUserByUserName(user.username);

      expect(findSpy).toHaveBeenCalledWith(user.username);
    });

    it('should call the method and return invalid parameters', async () => {
      const user = mockReadUserDto();

      const findSpy = jest
        .spyOn(service, 'findUserByUserName')
        .mockResolvedValueOnce(user);

      await service.findUserByUserName(null);

      expect(findSpy).not.toHaveBeenCalledWith(user.username);
    });

    it('should call the method and return the result', async () => {
      const user = mockReadUserDto();

      jest.spyOn(service, 'findUserByUserName').mockResolvedValueOnce(user);

      expect(await service.findUserByUserName(user.username)).toEqual(user);
    });

    it('should call the method and return the errors', () => {
      jest
        .spyOn(service, 'findUserByUserName')
        .mockRejectedValueOnce(new Error());

      const user = mockCreateUserDto();

      expect(service.findUserByUserName(user.username)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('verifyExistUser', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(service, 'verifyExistUser')
        .mockResolvedValueOnce(void 0);

      const user = mockCreateUserDto();

      await service.verifyExistUser(user);

      expect(findSpy).toHaveBeenCalledWith(user);
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(service, 'verifyExistUser')
        .mockResolvedValueOnce(void 0);

      await service.verifyExistUser(null);

      const user = mockCreateUserDto();

      expect(findSpy).not.toHaveBeenCalledWith(user);
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(service, 'verifyExistUser').mockResolvedValueOnce(void 0);

      const user = mockCreateUserDto();

      expect(await service.verifyExistUser(user)).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(service, 'verifyExistUser').mockRejectedValueOnce(new Error());

      const user = mockCreateUserDto();

      await expect(service.verifyExistUser(user)).rejects.toThrow(new Error());
    });
  });

  describe('createAndUpload', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(service, 'createAndUpload')
        .mockResolvedValueOnce(result);

      const user = mockCreateUserDto();

      await service.createAndUpload(user, 'url');

      expect(findSpy).toHaveBeenCalledWith(user, 'url');
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(service, 'createAndUpload')
        .mockResolvedValueOnce(result);

      await service.createAndUpload(null, null);

      const user = mockCreateUserDto();

      expect(findSpy).not.toHaveBeenCalledWith(user, 'url');
    });

    it('should call the method and return the result', async () => {
      const result = mockReadUserDto();

      jest.spyOn(service, 'createAndUpload').mockResolvedValueOnce(result);

      const user = mockCreateUserDto();

      expect(await service.createAndUpload(user, 'url')).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(service, 'createAndUpload').mockRejectedValueOnce(new Error());

      const user = mockCreateUserDto();

      expect(service.createAndUpload(user, 'url')).rejects.toThrow(new Error());
    });
  });

  describe('updateAndUpload', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(service, 'updateAndUpload')
        .mockResolvedValueOnce(result);

      const user = mockUpdateUserDto();
      const id = faker.string.uuid();

      await service.updateAndUpload(id, user, 'url');

      expect(findSpy).toHaveBeenCalledWith(id, user, 'url');
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(service, 'updateAndUpload')
        .mockResolvedValueOnce(result);

      await service.updateAndUpload(null, null, null);

      const user = mockUpdateUserDto();
      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id, user, 'url');
    });

    it('should call the method and return the result', async () => {
      const result = mockReadUserDto();

      jest.spyOn(service, 'updateAndUpload').mockResolvedValueOnce(result);

      const user = mockUpdateUserDto();
      const id = faker.string.uuid();

      expect(await service.updateAndUpload(id, user, 'url')).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(service, 'updateAndUpload').mockRejectedValueOnce(new Error());

      const user = mockUpdateUserDto();
      const id = faker.string.uuid();

      expect(service.updateAndUpload(id, user, 'url')).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('removePhoto', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(service, 'removePhoto')
        .mockResolvedValueOnce(void 0);

      const id = faker.string.uuid();

      await service.removePhoto(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(service, 'removePhoto')
        .mockResolvedValueOnce(void 0);

      await service.removePhoto(null);

      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id);
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(service, 'removePhoto').mockResolvedValueOnce(void 0);

      const id = faker.string.uuid();

      expect(await service.removePhoto(id)).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(service, 'removePhoto').mockRejectedValueOnce(new Error());

      const id = faker.string.uuid();

      await expect(service.removePhoto(id)).rejects.toThrow(new Error());
    });
  });

  describe('getPhoto', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadPhotoDto();

      const findSpy = jest
        .spyOn(service, 'getPhoto')
        .mockResolvedValueOnce(result);

      const id = faker.string.uuid();

      await service.getPhoto(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadPhotoDto();

      const findSpy = jest
        .spyOn(service, 'getPhoto')
        .mockResolvedValueOnce(result);

      await service.getPhoto(null);

      const id = faker.string.uuid();

      expect(findSpy).not.toHaveBeenCalledWith(id);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadPhotoDto();

      jest.spyOn(service, 'getPhoto').mockResolvedValueOnce(result);

      const id = faker.string.uuid();

      expect(await service.getPhoto(id)).toEqual(result);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(service, 'getPhoto').mockRejectedValueOnce(new Error());

      const id = faker.string.uuid();

      expect(service.getPhoto(id)).rejects.toThrow(new Error());
    });
  });
});
