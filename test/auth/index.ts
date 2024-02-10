import { faker } from '@faker-js/faker';

import {
  ValidateUserDto,
  CreateAuthDto,
  LoginUserDto,
  ReadLoginUserDto,
} from 'src/modules/auth/dtos';
import { mockReadUserDto } from 'src/../test/users';

export const mockValidateUser = (): ValidateUserDto => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    rule: 1,
    active: true,
  };
};

export const mockLoginUserDto = (): LoginUserDto => {
  const { id, active, rule } = mockReadUserDto();
  return { id, active, rule };
};

export const mockCreateUserAuthDto = (): CreateAuthDto => {
  const { id, createdAt, updatedAt, removedAt, ...rest } = mockReadUserDto();
  return { ...rest, password: faker.internet.password({ length: 14 }) };
};

export const mockLogin = (): ReadLoginUserDto => {
  const { id: userId, active, rule } = mockReadUserDto();
  return {
    token: faker.string.alpha(14),
    userId,
    active,
    rule,
    expirationTime: new Date().getTime() as any,
  };
};

export const mockJwtService = () => ({
  login: jest.fn(),
  verifyToken: jest.fn(),
});

export const mockRedisService = () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
});
