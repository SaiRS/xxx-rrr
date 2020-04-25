import { validateToBeType } from './_util';
import { isBoolean } from 'class-validator';

/**
 * 验证value，如果为boolean类型，则返回原始值
 * 否则返回defaultValue
 * @export
 * @param {*} value
 * @param {boolean} [defaultValue=false]
 * @returns {boolean}
 */
export function validateToBeBoolean(
  value: any,
  defaultValue: boolean = false,
): boolean {
  let result = validateToBeType(isBoolean, value, defaultValue);
  return validateToBeType(isBoolean, result, true);
}
