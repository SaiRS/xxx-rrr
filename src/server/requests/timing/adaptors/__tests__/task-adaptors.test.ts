import 'reflect-metadata';

import { createTimingTaskFactory } from '../task-adaptors';

describe('task-adaptor', () => {
  test('正常字段(不多不少)', () => {
    let data = {
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
    };

    let task = createTimingTaskFactory(data);
  });
});
