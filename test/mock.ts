import { faker } from '@faker-js/faker';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { Readable } from 'stream';
import { StreamableFile as StealableFile } from '@nestjs/common';

import { IPaginationMeta } from 'src/common/base/paginate';
import { ReadPhotoDto } from 'src/common/base/dtos/read-photo.dto';

export const mockMetaPagination: IPaginationMeta = {
  totalItems: 1,
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 1,
};

export const mockQueryParamsDefault = {
  search: 'search',
  page: 1,
  limit: 10,
  orderBy: '{"column": "title", "order": "DESC"}',
  rangeDates:
    '{"column":"createdAt","ranges":["2024-01-27T21:02:27.594Z","2024-01-27T21:22:27.594Z"]}',
};

export const mockMethodsRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  preload: jest.fn(),
  save: jest.fn(),
  insert: jest.fn(),
  remove: jest.fn(),
  count: jest.fn(),
};

export const mockQueryParams = (): any => ({
  ...mockQueryParamsDefault,
});

export const mockResponse = (): any => ({
  setHeader: jest.fn(),
});

export const mockRequest = (): any => ({
  user: { id: faker.string.uuid(), rule: 1 },
});

export const createReadStreamFromBase64 = () => {
  const buffer = Buffer.from(faker.image.dataUri(), 'base64');

  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  }) as ReadStream;
};

export const mockStealableFile = () => {
  const file = createReadStreamFromBase64();
  return new StealableFile(file);
};

export const mockReadPhotoDto = (): ReadPhotoDto => ({
  file: createReadStreamFromBase64(),
  mimetype: 'image/png',
});

export const mockFileMulter = () => {
  const buffer = Buffer.from(faker.image.dataUri(), 'base64');
  const stream = createReadStreamFromBase64();
  return {
    buffer,
    stream,
    mimetype: 'image/png',
    fieldname: faker.person.firstName(),
    filename: faker.person.firstName(),
    originalname: faker.person.firstName(),
    size: faker.number.int(),
    encoding: faker.image.dataUri(),
    destination: faker.person.firstName(),
    path: faker.image.url(),
  } as Express.Multer.File;
};

export * from './users';
export * from './books';
export * from './users';
