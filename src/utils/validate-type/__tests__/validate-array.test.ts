import { validateToBeArray } from '../index';

describe('validate to be number', () => {
  test('参数类型为array', () => {
    let result = validateToBeArray([3]);

    expect(result).toEqual([3]);
  });

  test('参数类型不为array, 默认值为array类型', () => {
    let result = validateToBeArray('3', [2]);

    expect(result).toEqual([2]);
  });

  test('参数类型不为array, 默认值也不为array类型', () => {
    // @ts-ignore
    let result = validateToBeArray(3, null);

    expect(result).toEqual([]);
  });
});
