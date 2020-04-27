import 'reflect-metadata';
import { ValidateFunc } from '@root/src/types';
import { isSymbol } from 'is-what';

type ApplyOptionFunc<OptType, R> = (
  option: OptType,
  validateFunc: ValidateFunc,
  newValue: R,
  oldValue: R,
) => R;

function identityApply<OptType, R>(
  option: OptType,
  validateFunc: ValidateFunc,
  newValue: R,
  oldValue: R,
): R {
  return newValue;
}

export interface IValidateToBeOption {
  targetPropertyName: string; // 真正记录的数据的字段
}

/**
 * 通用验证的装饰器，只有在类型符合的前提下赋值才能成功
 * 适用于set方法
 * @description 因为这个装饰器会修改discriptor的get和set,
 * 为了能能够获取到正确的实例对象对应的属性值，外界需要提供一个真正存储数据的属性
 * 然后在此基础上应用一个装饰器
 * @export
 * @template Value value的类型
 * @template OptionType option的类型
 * @param {ValidateFunc} validateFunc 用于类型验证的函数
 * @param {ApplyOptionFunc<OptionType, Value>} applyOptionFunc
 * @param {OptionType} options
 * @returns {PropertyDecorator} 属性装饰器
 *
 */
export function ValidateToBeTypeDecorator<
  Value,
  OptionType extends IValidateToBeOption
>(
  validateFunc: ValidateFunc,
  options: OptionType,
  applyOptionFunc: ApplyOptionFunc<OptionType, Value> = identityApply,
): PropertyDecorator {
  // NOTE: 属性装饰器，对于静态属性来说，target为constructor方法
  // 对于实例属性来说，则是class的prototype对象
  return function _ValidateToBeColorStringImpl(
    target: Object,
    propertyKey: string | symbol,
  ) {
    if (isSymbol(propertyKey)) {
      return;
    }

    // 如果不传targetPropertyName, 那么默认会使用_propertyKey作为存储的属性
    let targetPropertyName = options.targetPropertyName || `_${propertyKey}`;
    let descriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: true,
      set: function _generateValidateSet(v: any) {
        if (validateFunc(v)) {
          let calcV = applyOptionFunc(
            options,
            validateFunc,
            v,
            // @ts-ignore
            target.propertyKey,
          );
          if (validateFunc(calcV)) {
            // 设置新值
            // @ts-ignore
            this[targetPropertyName] = calcV;
          }
        }
      },
      get: function _generateValidateGet() {
        // @ts-ignore
        return this[targetPropertyName];
      },
    };

    Reflect.defineProperty(target, propertyKey, descriptor);
  };
}
