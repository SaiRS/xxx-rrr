import { ValidateFunc } from '@root/src/types';

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

/**
 * 通用验证的装饰器，只有在类型符合的前提下赋值才能成功
 * @export
 * @template Value value的类型
 * @template OptionType option的类型
 * @param {ValidateFunc} validateFunc 用于类型验证的函数
 * @param {ApplyOptionFunc<OptionType, Value>} applyOptionFunc
 * @param {OptionType} options
 * @returns {PropertyDecorator}
 */
export function ValidateToBeTypeDecorator<Value, OptionType>(
  validateFunc: ValidateFunc,
  options: OptionType,
  applyOptionFunc: ApplyOptionFunc<OptionType, Value> = identityApply,
): PropertyDecorator {
  return function _ValidateToBeColorStringImpl(
    target: Object,
    propertyKey: string | symbol,
  ) {
    let value: Value;

    let descriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: true,
      get() {
        return value;
      },
      set(v: any) {
        if (validateFunc(v)) {
          let calcV = applyOptionFunc(options, validateFunc, v, value);
          if (validateFunc(calcV)) {
            // 设置新值
            value = calcV;
          }
        }
      },
    };

    Reflect.defineProperty(target, propertyKey, descriptor);
  };
}
