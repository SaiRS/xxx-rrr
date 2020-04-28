import { isHexColor } from 'class-validator';
import { ValidateToBeTypeDecorator, IValidateToBeOption } from './_util';

/**
 * 装饰属性的装饰器
 * 只有是符合hex color的格式才能正确被设置
 * @export
 * @returns {PropertyDecorator}
 */
export function ValidateToBeColorStringDecorator(
  targetPropertyName: string = '',
): PropertyDecorator {
  // return ValidateToBeTypeDecorator<string, IValidateToBeOption>(isHexColor, {
  //   targetPropertyName,
  // });
  return ValidateToBeTypeDecorator(isHexColor, {
    targetPropertyName: targetPropertyName,
  });
}
