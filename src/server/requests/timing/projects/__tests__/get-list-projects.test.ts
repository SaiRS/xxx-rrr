import 'reflect-metadata';

import { getTimingProjects } from '../get-list-projects';

import timingRequest from '../../base';
jest.mock('../../base');

test('获取timing project(list模式)', async () => {
  // @ts-ignore
  timingRequest.get.mockResolvedValue({ data: { data: [] } });

  expect(await getTimingProjects()).toEqual([]);
});

afterAll(() => {
  // @ts-ignore
  timingRequest.mockClear();
});
