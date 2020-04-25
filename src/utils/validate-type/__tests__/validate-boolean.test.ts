import { validateToBeBoolean } from '../index';

describe('validate to be boolean', () => {
  test('参数类型为boolean', () => {
    let result = validateToBeBoolean(true);

    expect(result).toBe(true);
  });

  test('参数类型不为boolean, 默认值为boolean类型', () => {
    let result = validateToBeBoolean('3', false);

    expect(result).toBe(false);
  });

  test('参数类型不为boolean, 默认值也不为boolean类型', () => {
    // @ts-ignore
    let result = validateToBeBoolean(3, null);

    expect(result).toBe(true);
  });
});
