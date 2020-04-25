import 'reflect-metadata';

import {
  createTimingProjectProfileFactory,
  createTimgProjectFactory,
} from '../project-adaptors';
import { _IBTimingProjectProfile, _IBTimingProject } from '../project-types';

describe('createTimingProjectProfileFactory', () => {
  test('正常情况', () => {
    let data: _IBTimingProjectProfile = {
      self: '/projects/2',
    };

    let result = createTimingProjectProfileFactory(data);
    expect(result).not.toBe(null);
    expect(result).toEqual({
      id: '2',
    });
  });

  test('正常情况(含有多余的字段)', () => {
    let data: _IBTimingProjectProfile = {
      self: '/projects/2',
      // @ts-ignore
      other: 'hello',
    };

    let result = createTimingProjectProfileFactory(data);
    expect(result).not.toBe(null);
    expect(result).toEqual({
      id: '2',
    });
  });

  test('错误的输入格式', () => {
    let data: _IBTimingProjectProfile = {
      self: '/projects2',
    };

    let result = createTimingProjectProfileFactory(data);
    expect(result).toBe(null);
  });
});

describe('createTimgProjectFactory', () => {
  test('正常情况(所有字段正常，不多不少)', () => {
    let data: _IBTimingProject = {
      self: '/projects/1',
      title: 'Project at root level',
      title_chain: ['Project at root level'],
      color: '#FF0000',
      productivity_score: 1,
      is_archived: false,
      children: [
        {
          self: '/projects/2',
        },
      ],
      parent: null,
    };

    let result = createTimgProjectFactory(data);

    expect(result).not.toBe(null);
    expect(result).toMatchObject({
      id: '1',
      title: 'Project at root level',
      color: '#FF0000',
      productivity_score: 1,
      is_archived: false,
      parentId: null,
    });
    expect(result!.children.length).toBe(1);
    expect(result!.children[0]).toMatchObject({
      id: '2',
    });
  });

  test('缺少字段(title)', () => {
    // @ts-ignore
    let data: _IBTimingProject = {
      self: '/projects/1',
      title_chain: ['Project at root level'],
      color: '#FF0000',
      productivity_score: 1,
      is_archived: false,
      children: [
        {
          self: '/projects/2',
        },
      ],
      parent: null,
    };

    let result = createTimgProjectFactory(data);

    expect(result).not.toBe(null);
    expect(result).toMatchObject({
      id: '1',
      title: '', // 默认值
      color: '#FF0000',
      productivity_score: 1,
      is_archived: false,
      children: [{ id: '2' }],
      parentId: null,
    });
  });

  test('解析不了id', () => {
    let data: _IBTimingProject = {
      self: '/projects-1',
      title: 'Project at root level',
      title_chain: ['Project at root level'],
      color: '#FF0000',
      productivity_score: 1,
      is_archived: false,
      children: [
        {
          self: '/projects/2',
        },
      ],
      parent: null,
    };

    let result = createTimgProjectFactory(data);

    expect(result).toBe(null);
  });
});
