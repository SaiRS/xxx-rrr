import { validateToBeType } from '../_util';
import { isString, isNumber } from 'class-validator';

describe('validateToBeType', () => {
  test('自定义validate', () => {
    function validate(value: any): boolean {
      return isString(value) || isNumber(value);
    }

    let result = validateToBeType(validate, '3', '0');
    expect(result).toBe('3');

    expect(validateToBeType(validate, 3, '0')).toBe(3);
  });
});
