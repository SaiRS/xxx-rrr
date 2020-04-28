import { validateToBePlainObject } from '../index';

describe('validate to be Object', () => {
  test('参数类型为Object', () => {
    let result = validateToBePlainObject({
      a: 'hello',
    });

    expect(result).toEqual({
      a: 'hello',
    });
  });

  test('参数类型不为Object, 默认值为Object类型', () => {
    let result = validateToBePlainObject(3, {});

    expect(result).toEqual({});
  });

  test('参数类型不为Object, 默认值也不为Object类型', () => {
    // @ts-ignore
    let result = validateToBePlainObject(3, null);

    expect(result).toEqual({});
  });
});
