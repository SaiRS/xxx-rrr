import { isNumber, isBoolean } from 'class-validator';
import { ValidateToBeTypeDecorator } from './_util';
import { ValidateFunc } from '@root/src/types';

/**
 * 装饰属性的装饰器
 * 只有赋值数字时才会生效
 * @example
 * class Demo {
 *   @ValidateToBeBooleanDecorator()
 *  isRight: boolean;
 * }
 *
 * let demo = new Demo();
 * demo.isRight = 3; // 不会改变count的值
 * demo.isRight = false // 会改变count的值
 * @export
 * @param {boolean} [defaultValue=true]
 * @returns {PropertyDecorator}
 */
export function ValidateToBeBooleanDecorator(
  targetPropertyName: string = '',
  defaultValue: boolean = true,
) {
  let options = {
    defaultValue: defaultValue,
  };

  return ValidateToBeTypeDecorator(isBoolean, {
    targetPropertyName: targetPropertyName || '',
  });
}
