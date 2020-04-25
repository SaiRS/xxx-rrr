import { isHexColor } from 'class-validator';
import { ValidateToBeTypeDecorator } from './_util';
import { ValidateFunc } from '@root/src/types';

/**
 * 装饰属性的装饰器
 * 只有是符合hex color的格式才能正确被设置
 * @export
 * @returns {PropertyDecorator}
 */
export function ValidateToBeColorStringDecorator({
  format = 'hex',
}: {
  format?: string;
} = {}): PropertyDecorator {
  function validate(v: any) {
    // NOTE: 目前只支持hex格式
    if (isHexColor(v)) {
      return v;
    }
  }

  return ValidateToBeTypeDecorator(validate, {});
}
