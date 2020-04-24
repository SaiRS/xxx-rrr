import { getSelfLinkFromTaskId, getTaskIdFromSelfLink } from '../utils';

describe('getSelfLinkFromTaskId', () => {
  test('传入正常的string参数', () => {
    expect(getSelfLinkFromTaskId('1')).toBe('/tasks/1');
  });

  test('传入类型不正确的参数', () => {
    expect(function wrongArgTypes() {
      // @ts-ignore
      return getSelfLinkFromTaskId({});
    }).toThrowError();
  });

  test('不传入参数', () => {
    // @ts-ignore
    expect(getSelfLinkFromTaskId).toThrowError();
  });
});

describe('getTaskIdFromSelfLink', () => {
  test('正确的参数', () => {
    expect(getTaskIdFromSelfLink('/tasks/3')).toBe('3');
  });

  test('模式匹配不正确的参数', () => {
    expect(getTaskIdFromSelfLink('/task/3')).toBe(null);
    expect(getTaskIdFromSelfLink('random string')).toBe(null);
    expect(getTaskIdFromSelfLink('/tasks3')).toBe(null);
    expect(getTaskIdFromSelfLink('/projects/3')).toBe(null);
  });

  test('参数类型不正确', () => {
    function wrongArgTypeOfNone() {
      // @ts-ignore
      return getTaskIdFromSelfLink();
    }

    function wrongArgTypeObject() {
      // @ts-ignore
      return getTaskIdFromSelfLink({});
    }
    expect(wrongArgTypeObject).toThrowError();
    expect(wrongArgTypeOfNone).toThrowError();
  });
});
