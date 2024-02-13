import { IBaseService } from 'src/common/base/base.interface';

import {
  CreateBookDto,
  ReadBookDto,
  ReadPhotoDto,
  UpdateBookDto,
} from '../dtos';

export const IBookServiceType = 'IBookServiceType';

export interface IBookService extends IBaseService {
  createAndUpload: (
    createBookDto: CreateBookDto,
    imagePath: string,
  ) => Promise<ReadBookDto>;

  updateAndUpload: (
    id: string,
    updateBookDto: UpdateBookDto,
    imagePath: string,
  ) => Promise<ReadBookDto>;

  removePhoto: (id: string) => Promise<void>;

  getPhoto: (id: string) => Promise<ReadPhotoDto>;
}
