import {
  getDemensionPath,
  generateTag,
  getDisplayName,
  convertTagListToTagNodes,
  ITag,
} from '../tags';
import { generateTreeNode } from '../tree-node';

expect.extend({
  toBeTheSameTag(received: ITag, expected: ITag) {
    let result =
      received.color === expected.color &&
      received.description === expected.description &&
      received.name === expected.name;

    if (result) {
      return {
        message: () => `exptected ${received} not to match ${expected}`,
        pass: false,
      };
    } else {
      return {
        message: () => `expected ${received} to match ${expected}`,
        pass: true,
      };
    }
  },
});

describe('get tag demension name', () => {
  test('name', () => {
    expect(
      getDemensionPath(
        generateTag({
          name: 'name',
        }),
      ),
    ).toBe('');
  });

  test('pre/name', () => {
    expect(
      getDemensionPath(
        generateTag({
          name: 'pre/name',
        }),
      ),
    ).toBe('pre');
  });

  test('first/second/name', () => {
    expect(
      getDemensionPath(
        generateTag({
          name: 'first/second/name',
        }),
      ),
    ).toBe('first/second');
  });
});

describe('get tag display name', () => {
  test('name', () => {
    expect(
      getDisplayName(
        generateTag({
          name: 'name',
        }),
      ),
    ).toBe('name');
  });

  test('pre/name', () => {
    expect(
      getDisplayName(
        generateTag({
          name: 'pre/name',
        }),
      ),
    ).toBe('name');
  });

  test('first/second/name', () => {
    expect(
      getDisplayName(
        generateTag({
          name: 'first/second/name',
        }),
      ),
    ).toBe('name');
  });
});

describe('tag list to tree node', () => {
  test('没有文件夹的情况', () => {
    // 数据
    let tag1 = generateTag({
      name: '1',
    });
    let tag2 = generateTag({
      name: '2',
    });

    let tag3 = generateTag({
      name: '3',
    });

    let result = convertTagListToTagNodes([tag1, tag2, tag3]);

    expect(result.length).toEqual(3);
    expect(result[0].name).toBe('1');
    expect(result[1].name).toBe('2');
    expect(result[2].name).toBe('3');
  });

  test('有文件夹的情况', () => {
    // 数据
    let tag1 = generateTag({
      name: '1',
    });
    let tag2 = generateTag({
      name: '1/1',
    });

    let tag3 = generateTag({
      name: '3',
    });

    let result = convertTagListToTagNodes([tag1, tag2, tag3]);

    expect(result.length).toEqual(3);
    expect(result[0].name).toBe('1');
    expect(result[1].name).toBe('1');
    expect(result[1].children.length).toBe(1);
    expect(result[1].children[0].name).toBe('1');

    expect(result[2].name).toBe('3');
  });

  test('有文件夹的情况-2', () => {
    // 数据
    let tag1 = generateTag({
      name: '1',
    });
    let tag2 = generateTag({
      name: '1/1',
    });

    let tag3 = generateTag({
      name: '1/1/2',
    });

    let result = convertTagListToTagNodes([tag1, tag2, tag3]);

    expect(result.length).toEqual(2);
    expect(result[0].name).toBe('1');
    expect(result[1].name).toBe('1');
    expect(result[1].children.length).toBe(2);
    expect(result[1].children[0].name).toBe('1');
    expect(result[1].children[1].name).toBe('1');
    expect(result[1].children[1].children.length).toBe(1);
    expect(result[1].children[1].children[0].name).toBe('2');
  });

  test('有文件夹的情况-3', () => {
    // 数据
    let tag3 = generateTag({
      name: '1/2/3/4',
    });

    let result = convertTagListToTagNodes([tag3]);

    expect(result.length).toEqual(1);
    expect(result[0].name).toBe('1');
    expect(result[0].children.length).toBe(1);
    expect(result[0].children[0].name).toBe('2');
    expect(result[0].children[0].children.length).toBe(1);
    expect(result[0].children[0].children[0].name).toBe('3');
    expect(result[0].children[0].children[0].children.length).toBe(1);
    expect(result[0].children[0].children[0].children[0].name).toBe('4');
  });
});
