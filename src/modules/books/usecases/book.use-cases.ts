import { IBaseUseCases } from 'src/common/base/base.use-cases';

import {
  CreateBookDto,
  ReadBookDto,
  ReadPhotoDto,
  UpdateBookDto,
} from '../dtos';

export const IBookUseCasesType = 'IBookUseCasesType';

export class IBookUseCases extends IBaseUseCases {
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
