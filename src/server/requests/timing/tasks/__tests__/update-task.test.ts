import 'reflect-metadata';

import { updateTimingTask } from '../update-task';

import timingRequest from '../../base';
jest.mock('../../base');

describe('update task', () => {
  beforeEach(() => {
    // @ts-ignore
    timingRequest.put.mockReset();
  });

  test('成功更新task', async () => {
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
    timingRequest.put.mockResolvedValue({ data: { data: data } });

    let result = await updateTimingTask('1', {});

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

  test('更新失败', async () => {
    // @ts-ignore
    timingRequest.put.mockResolvedValue({
      data: { data: null },
    });

    let result = await updateTimingTask('1', {});

    expect(result).toBe(null);
  });
});

afterAll(() => {
  // @ts-ignore
  timingRequest.put.mockReset();
});
