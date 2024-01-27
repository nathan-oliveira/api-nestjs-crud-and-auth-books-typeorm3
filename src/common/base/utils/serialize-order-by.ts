enum EnumOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IOrderBy {
  column: string;
  order: EnumOrder;
}

export const serializeOrderBy = (value: string | IOrderBy) => {
  if (value && typeof value === 'string') {
    const orderBy = {};
    const { column, order } = JSON.parse(value) as IOrderBy;
    orderBy[column] = order.toUpperCase();
    return orderBy;
  }

  return orderByJson(value as IOrderBy);
};

const orderByJson = (value: IOrderBy) => {
  const orderBy = {};
  orderBy[value.column] = value.order.toUpperCase();
  return orderBy;
};
