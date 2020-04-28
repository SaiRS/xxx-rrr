import 'reflect-metadata';

import { getTimingTaskDetail } from '../get-task-detail';

import timingRequest from '../../base';
jest.mock('../../base');

describe('get task detail', () => {
  beforeEach(() => {
    // @ts-ignore
    timingRequest.get.mockReset();
  });

  test('成功获取task数据', async () => {
    let data = {
      self: '/time-entries/1',
      start_date: '2019-01-01T00:00:00.000000+00:00',
      end_date: '2019-01-01T01:00:00.000000+00:00',
      duration: 3600,
      project: {
        self: '/projects/1',
      },
      title: 'Client Meeting',
      notes: 'Some more detailed notes',
      is_running: false,
    };

    // @ts-ignore
    timingRequest.get.mockResolvedValue({ data: { data: data } });

    let result = await getTimingTaskDetail('1');

    expect(result).not.toBe(null);
    expect(result!.toObject()).toMatchObject({
      id: '1',
      duration: 3600,
      project: {
        id: '1',
      },
      title: 'Client Meeting',
      notes: {
        tags: [],
        goal: '',
        notes: '',
      },
      is_running: false,
    });
  });

  test('获取task数据失败', async () => {
    // @ts-ignore
    timingRequest.get.mockResolvedValue({
      data: { data: null },
    });

    let result = await getTimingTaskDetail('1');

    expect(result).toBe(null);
  });
});

afterAll(() => {
  // @ts-ignore
  timingRequest.get.mockReset();
});
