import { validateToBeType } from './_util';
import { isPlainObject } from 'is-what';

/**
 * 验证参数是否是plain object
 * 如果是，则返回原始值
 * 不是，则返回defaultValue
 * @export
 * @template T
 * @param {*} obj
 * @param {T} defaultValue
 * @returns
 */
export function validateToBePlainObject(
  value: any,
  defaultValue: Object = {},
): Object {
  let result = validateToBeType(isPlainObject, value, defaultValue);
  return validateToBeType(isPlainObject, result, {});
}
