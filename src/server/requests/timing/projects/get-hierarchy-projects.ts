import { timingRequest } from '../base';

import { IFTimingProject } from '@root/src/types';

/**
 * 获取timing的层级projects信息
 * @export
 * @returns {Promise<IFTimingProject[]>}
 */
export async function getHierarchyProjectsRequest(): Promise<
  IFTimingProject[]
> {
  let result = await timingRequest.get<{ data: IFTimingProject[] }>(
    '/projects/hierarchy',
  );
  return result.data.data;
}

export default getHierarchyProjectsRequest;
