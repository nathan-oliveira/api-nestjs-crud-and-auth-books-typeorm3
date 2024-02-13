import { DeepPartial } from 'typeorm';

import { ReadPhotoDto } from 'src/common/base/dtos/read-photo.dto';
import { QueryParamsDto } from './dtos/query-params.dto';
import { Pagination } from './paginate';

import { AppEntity } from './entities/app.entity';

export interface IBaseService {
  findByPaginate: (
    queryParams: QueryParamsDto,
    conditions?: Array<object>,
  ) => Promise<Pagination<AppEntity>>;

  findAll: () => Promise<AppEntity[]>;

  findById: (id: string) => Promise<AppEntity>;

  findByField: (field: string, value: string) => Promise<AppEntity[]>;

  create: (createEntityDto: DeepPartial<AppEntity>) => Promise<AppEntity>;

  multiCreate: (dataForm: Array<DeepPartial<AppEntity>>) => Promise<unknown>;

  update: (
    id: string,
    updateEntityDto: DeepPartial<AppEntity>,
  ) => Promise<AppEntity>;

  disableOrActivate: (id: string) => Promise<AppEntity>;

  remove: (id: string) => Promise<void>;

  removeToDB: (id: string) => Promise<void>;

  renderImage: (id: string, photoProp: string) => Promise<ReadPhotoDto>;

  destroyImage: (id: string, photoProp: string) => Promise<void>;
}
