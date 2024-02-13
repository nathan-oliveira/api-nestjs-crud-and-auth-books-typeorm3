import { ReadPhotoDto } from 'src/modules/books/dtos';
import { IBaseService } from 'src/common/base/base.interface';

import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dtos';

export const IUserServiceType = 'IUserServiceType';

export interface IUserService extends IBaseService {
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
