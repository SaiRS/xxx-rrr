import { validateToBeString } from '../validate-string';

describe('validate to be string', () => {
  test('参数类型为string', () => {
    let result = validateToBeString('right');

    expect(result).toBe('right');
  });

  test('参数类型不为string, 默认值为string类型', () => {
    let result = validateToBeString(3, 'default value');

    expect(result).toBe('default value');
  });

  test('参数类型不为string, 默认值也不为string类型', () => {
    // @ts-ignore
    let result = validateToBeString(3, null);

    expect(result).toBe('');
  });
});
