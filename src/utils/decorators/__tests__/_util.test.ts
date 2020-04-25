import { ValidateToBeTypeDecorator } from '../_util';
import { isNumber } from 'class-validator';
import { ValidateFunc } from '@root/src/types';

describe('decorator util', () => {
  test('自定义validateFunction decorator', () => {
    type CustomType = number;
    function CustomDecorator(options: any) {
      function validate(value: any): boolean {
        if (isNumber(value)) {
          return true;
        }
        return false;
      }

      function apply(
        opt: any,
        validateFunc: ValidateFunc,
        value: CustomType,
        oldValue: CustomType,
      ): CustomType {
        // 这里相当于累加
        return value + value;
      }

      return ValidateToBeTypeDecorator(validate, options, apply);
    }

    class Demo {
      @CustomDecorator({})
      count!: number;
    }

    let demo = new Demo();

    demo.count = 2;
    expect(demo.count).toBe(4);

    // @ts-ignore
    demo.count = null;
    expect(demo.count).toBe(4);
  });
});
