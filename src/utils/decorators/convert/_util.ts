import { isSymbol } from 'is-what';

export type ConvertFunc<O> = (value: any) => O;
export type ConvertApplyTypeFunc<I, O> = (value: I) => O;

/**
 * 转换装饰器的选项类型
 * @export
 * @interface IConvertTypeOptions
 */
export interface IConvertTypeOptions<I, O> {
  /**
   * 真正用于存储数据的实例的属性名
   */
  targetPropertyName: string;

  /**
   * 在应用转换之前的数据类型的转换函数
   */
  convertFunc: ConvertFunc<O>;

  /**
   * 用于转换的函数
   */
  applyFunc: ConvertApplyTypeFunc<I, O>;
}

/**
 * 基础的转换装饰器
 * @export
 * @param {IConvertTypeOptions} options 选项
 * @returns {PropertyDecorator} 属性装饰器
 */
export function ToTypeDecorator<I, O>(
  options: IConvertTypeOptions<I, O>,
): PropertyDecorator {
  return function _ToTypeImpl(target: Object, propertyKey: string | symbol) {
    if (isSymbol(propertyKey)) {
      return;
    }

    // 如果不传targetPropertyName, 那么默认会使用_propertyKey作为存储的属性
    let targetPropertyName = options.targetPropertyName || `_${propertyKey}`;
    let descriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: true,
      set: function _generateValidateSet(v: any) {
        // 先转换一下类型
        let value = options.convertFunc(v);
        // 设置新值
        // @ts-ignore
        this[targetPropertyName] = options.applyFunc(value);
      },
      get: function _generateValidateGet() {
        // @ts-ignore
        return this[targetPropertyName];
      },
    };

    Reflect.defineProperty(target, propertyKey, descriptor);
  };
}
