import { isNumber } from 'class-validator';
import { ValidateToBeTypeDecorator } from './_util';
import { ValidateFunc } from '@root/src/types';

/**
 * 装饰属性的装饰器
 * 只有赋值数字时才会生效
 * @example
 * class Demo {
 *   @ValidateToBeNumber(0)
 *  count: number;
 * }
 *
 * let demo = new Demo();
 * demo.count = 3; // 会改变count的值
 * demo.count = '3' // 不会改变count的值
 * @export
 * @param {number} [defaultValue=0]
 * @returns {PropertyDecorator}
 */
export function ValidateToBeNumberDecorator(
  targetPropertyName: string = '',
  defaultValue: number = 0,
) {
  let options = {
    defaultValue: defaultValue,
  };

  return ValidateToBeTypeDecorator(isNumber, {
    targetPropertyName: targetPropertyName || '',
  });
}
