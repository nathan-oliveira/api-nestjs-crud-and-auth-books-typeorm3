import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { createReadStream } from 'fs';
import * as fs from 'fs';

import { IBaseService } from 'src/common/base/base.interface';
import { AppEntity } from 'src/common/base/entities/app.entity';

import { QueryParamsDto } from 'src/common/base/dtos/query-params.dto';
import { getMimetype } from 'src/common/base/utils/get-mimetype';
import { ReadPhotoDto } from 'src/common/base/dtos/read-photo.dto';
import { IServiceOptionsDto } from './dtos/service-options.dto';

import { serializeOrderBy } from './utils/serialize-order-by';
import { serializeConditions } from './utils/serialize-conditions';
import { removeImageStorage } from './utils/storage';
import { Pagination, paginate } from './paginate';
import { serializeRangeDates } from './utils/serialize-range-dates';

@Injectable()
export abstract class BaseService<TEntity extends AppEntity>
  implements IBaseService
{
  constructor(
    readonly repository: Repository<TEntity>,
    readonly options: IServiceOptionsDto = null,
  ) {}

  async findByPaginate(
    queryParams: QueryParamsDto,
    conditions: Array<object> = [],
  ): Promise<Pagination<TEntity>> {
    const { page, limit, search, orderBy, rangeDates } = queryParams;
    const options = {};

    if (orderBy) options['order'] = serializeOrderBy(orderBy);
    if (this.options && this.options.relations) {
      options['relations'] = this.options.relations;
    }

    if (rangeDates) {
      const dates = serializeRangeDates(rangeDates);
      conditions.push(dates);
    }

    const where = serializeConditions(conditions, search, this.options);
    if (where) options['where'] = where;

    if (page) options['skip'] = page;
    if (limit) options['take'] = limit;

    return paginate<TEntity>(this.repository, options);
  }

  async findAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<TEntity> {
    const result = await this.repository.findOne({
      where: { id } as FindOptionsWhere<TEntity>,
    });

    if (!result) throw new NotFoundException('Register not found.');
    return result;
  }

  async findByField(field: string, value: string): Promise<TEntity[]> {
    const query = {};
    query[field] = value;
    return await this.repository.find(query);
  }

  async create(createEntityDto: DeepPartial<TEntity>): Promise<TEntity> {
    const preloadEntity = this.repository.create(createEntityDto);
    return await this.repository.save(preloadEntity);
  }

  async multiCreate(dataForm: Array<DeepPartial<TEntity>>): Promise<unknown> {
    return await Promise.all(
      dataForm.map((item) => this.repository.save(item)),
    );
  }

  async update(
    id: string,
    updateEntityDto: DeepPartial<TEntity>,
  ): Promise<TEntity> {
    const preloadUpdateEntity = (await this.repository.preload({
      ...updateEntityDto,
      id,
    })) as DeepPartial<TEntity>;

    if (!preloadUpdateEntity) {
      throw new NotFoundException('Register not found.');
    }

    return await this.repository.save(preloadUpdateEntity);
  }

  async disableOrActivate(id: string): Promise<TEntity> {
    const result = (await this.findById(id)) as DeepPartial<TEntity>;
    result.active = !result.active;
    return this.repository.save(result);
  }

  async remove(id: string): Promise<void> {
    const result = (await this.findById(id)) as DeepPartial<TEntity>;
    if (result) result.removedAt = new Date();
    await this.repository.save(result);
  }

  async removeToDB(id: string): Promise<void> {
    const result = await this.findById(id);
    await this.repository.remove(result);
  }

  async renderImage(id: string, photoProp: string): Promise<ReadPhotoDto> {
    const steam = { file: null, mimetype: null };
    const user = await this.findById(id);
    if (!user[photoProp]) throw new NotFoundException('Image not found.');

    const fileExist = fs.existsSync(user[photoProp]);
    if (!fileExist) throw new NotFoundException('Image not found.');

    steam.file = await createReadStream(user[photoProp]);
    steam.mimetype = getMimetype(steam.file.path);
    return steam;
  }

  async destroyImage(id: string, photoProp: string): Promise<void> {
    const data = await this.findById(id);
    if (!data[photoProp]) throw new NotFoundException('Image not found.');
    data[photoProp] = null;
    await this.repository.save(data);
    removeImageStorage(data[photoProp]);
  }
}
