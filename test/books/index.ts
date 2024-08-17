import { faker } from '@faker-js/faker';

import {
  ReadBookDto,
  CreateBookDto,
  UpdateBookDto,
} from 'src/modules/books/dtos';

import { UserEntity } from 'src/modules/users/entities/user.entity';
import { mockReadUserDto } from 'src/../test/users';

export const mockReadBookDto = (): ReadBookDto => {
  const user = mockReadUserDto();

  return {
    id: faker.string.uuid(),
    title: faker.lorem.text(),
    description: faker.lorem.paragraph(),
    fileUrl: faker.image.url(),
    userId: user.id,
    user: { ...user } as UserEntity,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    removedAt: null,
  } as ReadBookDto;
};

export const mockCreateBookDto = (): CreateBookDto => {
  const { title, description, userId } = mockReadBookDto();
  return { title, description, userId, active: true };
};

export const mockUpdateBookDto = (): UpdateBookDto => mockCreateBookDto();
