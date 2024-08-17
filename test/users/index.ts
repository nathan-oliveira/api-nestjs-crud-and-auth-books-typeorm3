import { faker } from '@faker-js/faker';

import {
  ReadUserDto,
  CreateUserDto,
  UpdateUserDto,
} from 'src/modules/users/dtos';

export const mockReadUserDto = (): ReadUserDto => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    rule: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    removedAt: null,
  } as ReadUserDto;
};

export const mockCreateUserDto = (): CreateUserDto => {
  const { id, createdAt, updatedAt, removedAt, ...rest } = mockReadUserDto();
  return {
    ...rest,
    password: faker.internet.password({ length: 14 }),
  };
};

export const mockUpdateUserDto = (): UpdateUserDto => mockCreateUserDto();
