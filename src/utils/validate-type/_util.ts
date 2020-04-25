import { ValidateFunc } from '@root/src/types';

/**
 * 使用typeValidFunc验证value，
 * 如果通过，则返回value
 * 不通过，则返回defaultValue
 * @template T
 * @param {(value: any) => boolean} typeValidFunc
 * @param {*} value
 * @param {T} defaultValue
 * @returns
 */
export function validateToBeType<
  T1 extends ValidateFunc,
  T2 extends any,
  T3 extends any
>(typeValidFunc: T1, value: T2, defaultValue: T3) {
  if (typeValidFunc(value)) {
    return value;
  } else {
    return defaultValue;
  }
}
