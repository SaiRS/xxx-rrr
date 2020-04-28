import { isString } from 'class-validator';
import { ValidateToBeTypeDecorator } from './_util';

/**
 * 装饰属性的装饰器
 * 只有赋值字符串时才会生效
 * @example
 * class Demo {
 *   @ValidateToBeString('')
 *  title: string;
 * }
 *
 * let demo = new Demo();
 * demo.title = 3; // 不会改变title的值
 * demo.title = '3' // 成功改变title的值
 * @export
 * @param {string} [defaultValue='']
 * @returns {PropertyDecorator} 属性装饰器
 */
export function ValidateToBeStringDecorator(
  targetPropertyName: string = '',
  defaultValue: string = '',
): PropertyDecorator {
  let options = {
    defaultValue: defaultValue,
  };

  return ValidateToBeTypeDecorator(isString, {
    targetPropertyName: targetPropertyName || '',
  });
}
