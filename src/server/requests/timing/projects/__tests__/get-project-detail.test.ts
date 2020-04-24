import 'reflect-metadata';

import { getTimingProjectDetail } from '../get-project-detail';

import { _IBTimingProject } from '../../adaptors';

import timingRequest from '../../base';
jest.mock('../../base');

describe('获取project详情', () => {
  beforeEach(() => {
    // @ts-ignore
    timingRequest.mockClear();
  });

  test('获取存在的project', async () => {
    let mockProject: _IBTimingProject = {
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

    // @ts-ignore
    timingRequest.get.mockResolvedValue({
      data: { data: mockProject },
    });

    let result = await getTimingProjectDetail('1');

    expect(result).not.toBe(null);
    // @ts-ignore
    expect(result.id).toBe('1');
    // @ts-ignore
    expect(result.title).toBe(mockProject.title);
    // @ts-ignore
    expect(result.color).toBe(mockProject.color);
    // @ts-ignore
    expect(result.productivity_score).toBe(mockProject.productivity_score);
    // @ts-ignore
    expect(result.is_archived).toBe(mockProject.is_archived);
    // @ts-ignore
    expect(result.parentId).toBe(null);

    // @ts-ignore
    expect(result.children.length).toBe(1);
    // @ts-ignore
    expect(result.children[0].id).toBe('2');
  });

  test('不存在的project', async () => {
    // @ts-ignore
    timingRequest.get.mockResolvedValue({
      data: { data: null },
    });

    let result = await getTimingProjectDetail('1');
    expect(result).toBe(null);
  });
});

afterAll(() => {
  // @ts-ignore
  timingRequest.mockClear();
});
