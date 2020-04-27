import { ValidateToBeTypeDecorator } from './_util';
import dayjs from 'dayjs';
import { ValidateFunc } from '@root/src/types';

/**
 * 属性装饰器：所装饰的属性需要是IOS时间格式的才能被赋值
 * 如：2019-01-01T00:00:00+00:00
 * @example
 * class Demo {
 *
 *  @ValidateToBeDateStringDecorator()
 *
 *  date;
 *
 * }
 *
 *  let demo = new Demo();
 *
 *  demo.date = 'unvalid time'; // 不会被设置
 *
 *  demo.date = '2019-01-01T00:00:00+00:00' //成功
 * @export
 * @returns {PropertyDecorator} 属性装饰器
 */
export function ValidateToBeDateStringDecorator(
  targetPropertyName: string = '',
) {
  function validate(value: any): boolean {
    return dayjs(value).isValid();
  }

  function apply(
    options: any,
    validateFunc: ValidateFunc,
    value: any,
    oldValue: string,
  ): string {
    // value通过了validate验证，但我们需要将其转换成ios8601字符串形式(2019-01-01T00:00:00+00:00)
    return dayjs(value).format();
  }

  return ValidateToBeTypeDecorator(
    validate,
    { targetPropertyName: targetPropertyName || '' },
    apply,
  );
}
