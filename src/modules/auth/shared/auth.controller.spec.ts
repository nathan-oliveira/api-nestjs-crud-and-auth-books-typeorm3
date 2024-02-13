import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/shared/users.service';
import { RedisService } from 'src/config/redis.config';

import { UserEntity } from 'src/modules/users/entities/user.entity';
import { IAuthUseCasesType, IAuthUseCases } from '../usecases/auth.use-cases';
import {
  IUserUseCasesType,
  IUserUseCases,
} from 'src/modules/users/usecases/user.use-cases';

import {
  mockReadUserDto,
  mockCreateUserAuthDto,
  mockJwtService,
  mockLogin,
  mockRequest,
  mockRedisService,
  mockMethodsRepository,
} from 'src/../test/mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: IAuthUseCases;
  let usersService: IUserUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: IAuthUseCasesType, useClass: AuthService },
        { provide: IUserUseCasesType, useClass: UsersService },
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

    controller = module.get<AuthController>(AuthController);
    authService = module.get<IAuthUseCases>(IAuthUseCasesType);
    usersService = module.get<IUserUseCases>(IUserUseCasesType);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'create')
        .mockResolvedValueOnce(result);

      const user = mockCreateUserAuthDto();

      await controller.create(user);

      expect(findSpy).toHaveBeenCalledWith(user);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockReadUserDto();

      const findSpy = jest
        .spyOn(controller, 'create')
        .mockResolvedValueOnce(result);

      const user = mockCreateUserAuthDto();

      await controller.create(null);

      expect(findSpy).not.toHaveBeenCalledWith(user);
    });

    it('should call the method and return the result', async () => {
      const result = mockReadUserDto();

      jest.spyOn(controller, 'create').mockResolvedValueOnce(result);

      const user = mockCreateUserAuthDto();

      expect(await controller.create(user)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'create').mockRejectedValueOnce(new Error());

      const user = mockCreateUserAuthDto();

      expect(controller.create(user)).rejects.toThrow(new Error());
    });
  });

  describe('login', () => {
    it('must call the method and return the correct parameters', async () => {
      const result = mockLogin();

      const findSpy = jest
        .spyOn(controller, 'login')
        .mockResolvedValueOnce(result);

      const req = mockRequest();

      await controller.login(req);

      expect(findSpy).toHaveBeenCalledWith(req);
    });

    it('should call the method and return invalid parameters', async () => {
      const result = mockLogin();

      const findSpy = jest
        .spyOn(controller, 'login')
        .mockResolvedValueOnce(result);

      const req = mockRequest();

      await controller.login(null);

      expect(findSpy).not.toHaveBeenCalledWith(req);
    });

    it('should call the method and return the result', async () => {
      const result = mockLogin();

      jest.spyOn(controller, 'login').mockResolvedValueOnce(result);

      const req = mockRequest();

      expect(await controller.login(req)).toEqual(result);
    });

    it('should call the method and return the errors', () => {
      jest.spyOn(controller, 'login').mockRejectedValueOnce(new Error());

      const req = mockRequest();

      expect(controller.login(req)).rejects.toThrow(new Error());
    });
  });

  describe('logout', () => {
    it('must call the method and return the correct parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'logout')
        .mockResolvedValueOnce(void 0);

      const req = mockRequest();

      await controller.logout(req);

      expect(findSpy).toHaveBeenCalledWith(req);
    });

    it('should call the method and return invalid parameters', async () => {
      const findSpy = jest
        .spyOn(controller, 'logout')
        .mockResolvedValueOnce(void 0);

      await controller.logout(null);

      const req = mockRequest();

      expect(findSpy).not.toHaveBeenCalledWith(req);
    });

    it('should call the method and return the result', async () => {
      jest.spyOn(controller, 'logout').mockResolvedValueOnce(void 0);

      const req = mockRequest();

      expect(await controller.logout(req)).toEqual(void 0);
    });

    it('should call the method and return the errors', async () => {
      jest.spyOn(controller, 'logout').mockRejectedValueOnce(new Error());

      const req = mockRequest();

      await expect(controller.logout(req)).rejects.toThrow(new Error());
    });
  });
});
