import { Between } from 'typeorm';

interface ObjectLiteral {
  [s: string]: any;
}

export interface IRangeDates {
  column: string;
  ranges: string[];
}

/** Ex:
 * @param {rangeDates} rangeDates - JSON.stringify({ column: 'createdAt', rages: [new Date().toISOString(), new Date().toISOString()] })
 * @returns {ObjectLiteral} - { createdAt: Between(startDate, endDate) }
 */
export const serializeRangeDates = (
  rangeDates: string | IRangeDates,
): ObjectLiteral => {
  const { column, ranges }: IRangeDates =
    typeof rangeDates === 'string' ? JSON.parse(rangeDates) : rangeDates;
  const [startDate, endDate] = ranges;

  const whereRange = {};
  whereRange[column] = Between(startDate, endDate);
  return whereRange;
};
