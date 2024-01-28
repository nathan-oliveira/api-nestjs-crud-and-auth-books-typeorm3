import { ReadPhotoDto } from 'src/modules/books/dtos';
import { IBaseUseCases } from 'src/common/base/base.use-cases';

import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dtos';

export const IUserUseCasesType = 'IUserUseCasesType';

export class IUserUseCases extends IBaseUseCases {
  convertToHash: (password: string) => Promise<string>;

  findUserByUserName: (username: string) => Promise<ReadUserDto>;

  verifyExistUser: (data: CreateUserDto | UpdateUserDto) => Promise<void>;

  createAndUpload: (
    createUserDto: CreateUserDto,
    imagePath: string,
  ) => Promise<ReadUserDto>;

  updateAndUpload: (
    id: string,
    updateUserDto: UpdateUserDto,
    imagePath: string,
  ) => Promise<ReadUserDto>;

  removePhoto: (id: string) => Promise<void>;

  getPhoto: (id: string) => Promise<ReadPhotoDto>;
}
