import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/shared/users.service';
import { RedisService } from 'src/config/redis.config';

import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  IAuthServiceType,
  IAuthService,
} from '../interfaces/auth-service.interface';
import {
  IUserServiceType,
  IUserService,
} from 'src/modules/users/interfaces/user-service.interface';

import {
  mockReadUserDto,
  mockValidateUser,
  mockLoginUserDto,
  mockCreateUserAuthDto,
  mockJwtService,
  mockLogin,
  mockRedisService,
  mockMethodsRepository,
} from 'src/../test/mock';

describe('AuthService', () => {
  let authService: IAuthService;
  let usersService: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IAuthServiceType, useClass: AuthService },
        { provide: IUserServiceType, useClass: UsersService },
        {
          provide: JwtService,
          useValue: mockJwtService(),
        },
        {
          provide: RedisService,
          useValue: mockRedisService(),
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockMethodsRepository,
        },
      ],
      imports: [UserEntity],
    }).compile();

    authService = module.get<IAuthService>(IAuthServiceType);
    usersService = module.get<IUserService>(IUserServiceType);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('validateUser', () => {
    it('must call the method and return the parameters in the right order', async () => {
      const validateUser = mockValidateUser();

      const findSpy = jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValueOnce(validateUser);

      const username = faker.internet.userName();
      const { name } = validateUser;
      await authService.validateUser(name, username);

      expect(findSpy).toHaveBeenCalledWith(name, username);
    });

    it('should call the method and return invalid parameters', async () => {
      const validateUser = mockValidateUser();

      const findSpy = jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValueOnce(validateUser);

      await authService.validateUser(null, null);

      const username = faker.internet.userName();
      const { name } = validateUser;

      expect(findSpy).not.toHaveBeenCalledWith(name, username);
    });

    it('should call the method and return the result', async () => {
      const validateUser = mockValidateUser();

      jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValueOnce(validateUser);

      const username = faker.internet.userName();
      const { name } = validateUser;

      expect(await authService.validateUser(name, username)).toEqual(
        validateUser,
      );
    });

    it('should call the method and return the errors', () => {
      jest
        .spyOn(authService, 'validateUser')
        .mockRejectedValueOnce(new Error());

      const username = faker.internet.userName();
      const { name } = mockValidateUser();

      expect(authService.validateUser(name, username)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('userIsDisabled', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(authService, 'userIsDisabled')
        .mockResolvedValueOnce(void 0);

      const { id } = mockValidateUser();

      await authService.userIsDisabled(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(authService, 'userIsDisabled')
        .mockResolvedValueOnce(void 0);

      await authService.userIsDisabled(null);

      const { id } = mockValidateUser();

      expect(findSpy).not.toHaveBeenCalledWith(id);
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(authService, 'userIsDisabled').mockResolvedValueOnce(void 0);

      const { id } = mockValidateUser();

      expect(await authService.userIsDisabled(id)).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest
        .spyOn(authService, 'userIsDisabled')
        .mockRejectedValueOnce(new Error());

      const { id } = mockValidateUser();

      await expect(authService.userIsDisabled(id)).rejects.toThrow(new Error());
    });
  });

  describe('create', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(authService, 'create')
        .mockResolvedValueOnce(result);

      const user = mockCreateUserAuthDto();

      await authService.create(user);

      expect(findSpy).toHaveBeenCalledWith(user);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(authService, 'create')
        .mockResolvedValueOnce(result);

      await authService.create(null);

      const user = mockCreateUserAuthDto();

      expect(findSpy).not.toHaveBeenCalledWith(user);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadUserDto();

      jest.spyOn(authService, 'create').mockResolvedValueOnce(result);

      const user = mockCreateUserAuthDto();

      expect(await authService.create(user)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(authService, 'create').mockRejectedValueOnce(new Error());

      const user = mockCreateUserAuthDto();

      expect(authService.create(user)).rejects.toThrow(new Error());
    });
  });

  describe('login', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockLogin();

      const findSpy = jest
        .spyOn(authService, 'login')
        .mockResolvedValueOnce(result);

      const loginUser = mockLoginUserDto();

      await authService.login(loginUser);

      expect(findSpy).toHaveBeenCalledWith(loginUser);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockLogin();

      const findSpy = jest
        .spyOn(authService, 'login')
        .mockResolvedValueOnce(result);

      await authService.login(null);

      const loginUser = mockLogin();

      expect(findSpy).not.toHaveBeenCalledWith(loginUser);
    });

    it('should call the method and return the result', async () => {
      const result = mockLogin();

      jest.spyOn(authService, 'login').mockResolvedValueOnce(result);

      const loginUser = mockLoginUserDto();

      expect(await authService.login(loginUser)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      const loginUser = mockLoginUserDto();

      expect(authService.login(loginUser)).rejects.toThrow(new Error());
    });
  });

  describe('logout', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(authService, 'logout')
        .mockResolvedValueOnce(void 0);

      const { id } = mockValidateUser();

      await authService.logout(id);

      expect(findSpy).toHaveBeenCalledWith(id);
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(authService, 'logout')
        .mockResolvedValueOnce(void 0);

      await authService.logout(null);

      const { id } = mockValidateUser();

      expect(findSpy).not.toHaveBeenCalledWith(id);
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(authService, 'logout').mockResolvedValueOnce(void 0);

      const { id } = mockValidateUser();

      expect(await authService.logout(id)).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(authService, 'logout').mockRejectedValueOnce(new Error());

      const { id } = mockValidateUser();

      await expect(authService.logout(id)).rejects.toThrow(new Error());
    });
  });
});
