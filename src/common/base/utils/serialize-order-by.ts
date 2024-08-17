enum EnumOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IOrderBy {
  column: string;
  order: EnumOrder;
}

/** Ex:
 * @param {value} value - JSON.stringify({ column: 'title', order: 'DESC' })
 * @param {value} value - JSON.stringify({ column: 'user.name', order: 'DESC' })
 * @returns {Object} - { title: 'DESC' }
 */
export const serializeOrderBy = (value: string | IOrderBy) => {
  if (value && typeof value === 'string') {
    const { column, order } = JSON.parse(value) as IOrderBy;
    if (!column.includes('.')) return orderByJson({ column, order });
    const [relation, columnRelation] = column.split('.');
    return {
      [relation]: { [columnRelation]: order.toUpperCase() },
    };
  }

  return orderByJson(value as IOrderBy);
};

const orderByJson = (value: IOrderBy) => ({
  [value.column]: value.order.toUpperCase(),
});
