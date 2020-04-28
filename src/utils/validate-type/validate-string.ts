import { validateToBeType } from './_util';
import { isString } from 'class-validator';

/**
 *
 * @export
 * @param {*} value
 * @param {string} [defaultValue='']
 * @returns {string}
 */
export function validateToBeString(
  value: any,
  defaultValue: string = '',
): string {
  let result = validateToBeType(isString, value, defaultValue);
  return validateToBeType(isString, result, '');
}
