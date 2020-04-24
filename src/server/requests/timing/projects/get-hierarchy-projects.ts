import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';
import { _IBTimingProject, createTimgProjectFactory } from '../adaptors';

/**
 * 获取timing的层级projects信息
 * @export
 * @returns {Promise<IFTimingProject[]>}
 */
export async function getHierarchyProjectsRequest(): Promise<
  IFTimingProject[]
> {
  let result = await timingRequest.get<{ data: _IBTimingProject[] }>(
    '/projects/hierarchy',
  );

  // 适配：self -> projectId
  return result.data.data.map((item) => createTimgProjectFactory(item));
}

export default getHierarchyProjectsRequest;
