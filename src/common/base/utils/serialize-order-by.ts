enum EnumOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IOrderBy {
  column: string;
  order: EnumOrder;
}

export const serializeOrderBy = (order: IOrderBy) => {
  const orderBy = new Object();
  if (order) orderBy[order.column] = order.order;
  return orderBy;
};
