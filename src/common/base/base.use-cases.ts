import { DeepPartial } from 'typeorm';

import { Pagination } from './paginate';
import { QueryParamsDto } from './dtos/query-params.dto';
import { ReadPhotoDto } from 'src/common/base/dtos/read-photo.dto';
import { AppEntity } from './entities/app.entity';

export class IBaseUseCases {
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
