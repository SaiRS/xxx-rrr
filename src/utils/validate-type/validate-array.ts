import { validateToBeType } from './_util';
import { isArray } from 'class-validator';

/**
 * 验证参数，如果参数为数组，则返回原始值
 * 如果参数不是数组，则使用defaultValue充当返回值
 * @export
 * @template T
 * @param {*} arr
 * @param {T[]} [defaultValue=[]]
 * @returns {T[]}
 */
export function validateToBeArray<T>(value: any, defaultValue: T[] = []): T[] {
  let result = validateToBeType(isArray, value, defaultValue);
  return validateToBeType(isArray, result, []);
}
