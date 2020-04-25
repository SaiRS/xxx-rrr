import { validateToBeNumber } from '../index';

describe('validate to be number', () => {
  test('参数类型为number', () => {
    let result = validateToBeNumber(4);

    expect(result).toBe(4);
  });

  test('参数类型不为number, 默认值为number类型', () => {
    let result = validateToBeNumber('3', 2);

    expect(result).toBe(2);
  });

  test('参数类型不为number, 默认值也不为number类型', () => {
    // @ts-ignore
    let result = validateToBeNumber('3-1', null);

    expect(result).toBe(0);
  });
});
