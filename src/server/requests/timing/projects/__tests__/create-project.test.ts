import 'reflect-metadata';

import { createTimingProject } from '../create-project';

import timingRequest from '../../base';
jest.mock('../../base');

describe('创建project', () => {
  beforeEach(() => {
    // @ts-ignore
    timingRequest.mockClear();
  });

  test('成功创建project', async () => {
    let title = 'Acme Inc.';
    let color = '#FF0000';
    let score = 0;
    let mockProject = {
      self: '/projects/2',
      title: title,
      title_chain: ['Project at root level', 'Acme Inc.'],
      color: color,
      productivity_score: score,
      is_archived: false,
      children: [],
      parent: {
        self: '/projects/1',
      },
    };
    // @ts-ignore
    timingRequest.post.mockResolvedValue({ data: { data: mockProject } });

    let result = await createTimingProject({
      title: title,
      parentId: '1',
      color: color,
      productivity_score: score,
      is_archived: false,
    });

    expect(result).not.toBe(null);
    expect(result!.id).toBe('2');
    expect(result!.title).toBe(title);
    expect(result!.parentId).toBe('1');
    expect(result!.color).toBe(color);
    expect(result!.productivity_score).toBe(score);
    expect(result!.is_archived).toBe(false);
  });
});

afterAll(() => {
  // @ts-ignore
  timingRequest.mockClear();
});
