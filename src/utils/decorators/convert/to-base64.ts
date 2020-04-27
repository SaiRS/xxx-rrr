import { ToTypeDecorator } from './_util';
import { isString } from 'class-validator';

function toBase64(value: string): string {
  return Base64.encode(value);
}

function convertFunc(value: any): string {
  return value + '';
}

/**
 * 将字符串转换成base64格式的装饰器
 * @export
 * @returns {PropertyDecorator} 属性装饰器
 */
export function ToBase64Decorator(): PropertyDecorator {
  return ToTypeDecorator<string, string>({
    targetPropertyName: '', // 使用默认的targetProperty
    applyFunc: toBase64,
    convertFunc: convertFunc,
  });
}
