import { FindManyOptions, Repository } from 'typeorm';

interface ObjectLiteral {
  [s: string]: any;
}

interface IPaginationMeta {
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
}

interface PaginatedData<PaginationObject> {
  items: PaginationObject[];
  totalItems: number;
}

export interface Pagination<PaginationObject> extends ObjectLiteral {
  items: PaginationObject[];
  meta: IPaginationMeta;
}

export async function paginate<T>(
  repository: Repository<T>,
  options: FindManyOptions,
): Promise<Pagination<T>> {
  const currentPage = Number(options.skip || 1);
  const promises = [
    new Promise<Array<T>>((resolve) => {
      return resolve(
        repository.find({
          skip: Number(options.take || 10) * (currentPage - 1),
          take: Number(options.take || 10),
          relations: options.relations ?? [],
          order: options.order ?? {},
          where: options.where,
        }),
      );
    }),
    new Promise<number>((resolve) => {
      return resolve(
        repository.count({
          where: options.where ?? {},
          relations: options.relations ?? [],
        }),
      );
    }),
  ];

  const [items, totalItems] = await Promise.all(promises);
  const totalPages = Math.ceil(Number(totalItems) / Number(options.take));

  return {
    items,
    meta: {
      totalItems,
      totalPages,
      currentPage,
      // itemCount: items.length,
    },
  } as Pagination<T>;
}
