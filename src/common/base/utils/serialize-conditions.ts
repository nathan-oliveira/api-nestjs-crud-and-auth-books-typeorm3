import { ILike } from 'typeorm';

import { hasBetweenType } from './has-between-type';
import { IServiceOptionsDto } from '../dtos/service-options.dto';

export const serializeConditions = (
  conditions: Array<object>,
  search: string,
  options: IServiceOptionsDto,
) => {
  const wheres = [];
  wheres.push({ removedAt: null });

  if (search && options && options.filters) {
    const filters = options.filters;

    filters.forEach((filterValue) => {
      if (filterValue.includes('.')) {
        const [relation, column] = filterValue.split('.');

        wheres.push({
          [relation]: {
            [column]: ILike(`%${search}%`),
          },
        });
      } else {
        wheres.push({ [filterValue]: ILike(`%${search}%`) });
      }
    });
  }

  if (conditions.length) conditions.forEach((item) => wheres.push(item));

  const removedAt = wheres.find((obj: any) => obj.removedAt !== undefined);
  const dateBetween = Object.assign(
    {},
    ...wheres.filter((item) => hasBetweenType(item)),
  );

  const queryParams = wheres.filter((obj: any) => {
    const isDateBetween = hasBetweenType(obj);
    return obj.removedAt === undefined && isDateBetween === false;
  });

  const newQueryParams = queryParams.map((item) => {
    let newItem = { ...item, ...dateBetween };
    if (removedAt) newItem = { ...newItem, ...removedAt };
    return newItem;
  });

  if (!newQueryParams.length) {
    return Object.assign({}, ...wheres);
  } else {
    return newQueryParams;
  }
};
