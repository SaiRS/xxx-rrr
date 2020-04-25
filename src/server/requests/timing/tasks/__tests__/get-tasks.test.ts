import 'reflect-metadata';

import timingRequest from '../../base';
import { getTimingTasks } from '../get-tasks';
jest.mock('../../base');

test('get tasks', async () => {
  let list = [
    {
      self: '/time-entries/1',
      start_date: '2019-01-01T00:00:00.000000+00:00',
      end_date: '2019-01-01T01:00:00.000000+00:00',
      duration: 3600,
      project: {
        self: '/projects/1',
        title: 'Project at root level',
        title_chain: ['Project at root level'],
        color: '#FF0000',
        productivity_score: 1,
        is_archived: false,
        parent: null,
      },
      title: 'Client Meeting',
      notes: 'Some more detailed notes',
      is_running: false,
    },
  ];
  let meta = {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: 'https://web.timingapp.com/api/v1/time-entries',
    per_page: 1000,
    to: 1,
    total: 1,
  };

  // @ts-ignore
  timingRequest.get.mockResolvedValue({ data: { data: list, meta: meta } });

  let result = await getTimingTasks();

  expect(result).not.toBe(null);
  expect(result.totalCount).toBe(1);
});

afterAll(() => {
  // @ts-ignore
  timingRequest.mockClear();
});
