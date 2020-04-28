import { validateToBeType } from './_util';
import { isNumber } from 'class-validator';

/**
 *
 * @export
 * @param {*} value
 * @param {number} [defaultValue=0]
 * @returns {number}
 */
export function validateToBeNumber(
  value: any,
  defaultValue: number = 0,
): number {
  let result = validateToBeType(isNumber, value, defaultValue);
  return validateToBeType(isNumber, result, 0);
}
