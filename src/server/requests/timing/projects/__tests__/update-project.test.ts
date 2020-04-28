import 'reflect-metadata';

import { updateTimingProject } from '../update-project';

import timingRequest from '../../base';
jest.mock('../../base');

describe('update project', () => {
  beforeEach(() => {
    // @ts-ignore
    timingRequest.mockClear();
  });

  test('修改存在的project', async () => {
    let newTitle = 'new title';
    let newColor = '#ff0000';
    let newScore = 1;

    let mockProject = {
      self: '/projects/2',
      title: newTitle,
      title_chain: ['Project at root level', 'Acme Inc.'],
      color: newColor,
      productivity_score: newScore,
      is_archived: false,
      children: [],
      parent: {
        self: '/projects/1',
      },
    };

    // @ts-ignore
    timingRequest.put.mockResolvedValue({ data: { data: mockProject } });

    let result = await updateTimingProject('2', {});

    expect(result).not.toBe(null);
    expect(result!.title).toBe(newTitle);
    expect(result!.parentId).toBe('1');
    expect(result!.color).toBe(newColor);
    expect(result!.productivity_score).toBe(newScore);
    expect(result!.is_archived).toBe(false);
  });

  test('修改不存在的project', async () => {
    // @ts-ignore
    timingRequest.put.mockResolvedValue({
      data: { data: null },
    });

    let result = await updateTimingProject('not-exist-id', {});

    expect(result).toBe(null);
  });
});

afterAll(() => {
  // @ts-ignore
  timingRequest.mockClear();
});
