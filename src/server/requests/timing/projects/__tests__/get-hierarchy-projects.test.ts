// import 'reflect-metadata';

import getHierarchyProjectsRequest from '../get-hierarchy-projects';

import timingRequest from '../../base';
jest.mock('../../base');

test('测试获取timing的项目列表(层级结构)', async () => {
  // @ts-ignore
  timingRequest.get.mockResolvedValue({ data: { data: [] } });

  let result = await getHierarchyProjectsRequest();

  expect(result).toEqual([]);
});
