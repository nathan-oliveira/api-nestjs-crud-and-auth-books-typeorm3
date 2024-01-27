enum EnumOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface ObjectLiteral {
  [s: string]: 'ASC' | 'DESC' | 'asc' | 'desc';
}

export interface IOrderBy {
  column: string;
  order: EnumOrder;
}

/** Ex:
 * @param {value} value - JSON.stringify({ column: 'title', order: 'DESC' })
 * @returns {ObjectLiteral} - { title: 'DESC' }
 */
export const serializeOrderBy = (value: string | IOrderBy): ObjectLiteral => {
  if (value && typeof value === 'string') {
    const orderBy = {};
    const { column, order } = JSON.parse(value) as IOrderBy;
    orderBy[column] = order.toUpperCase();
    return orderBy;
  }

  return orderByJson(value as IOrderBy);
};

const orderByJson = (value: IOrderBy): ObjectLiteral => {
  const orderBy = {};
  orderBy[value.column] = value.order.toUpperCase();
  return orderBy;
};
