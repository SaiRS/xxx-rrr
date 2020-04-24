import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';
import { _IBTimingProject, createTimgProjectFactory } from '../adaptors';

/**
 * 以列表形式返回所有的项目信息
 * @export
 * @returns {Promise<IFTimingProject[]>} 所有的项目信息
 */
export async function getTimingProjects(): Promise<IFTimingProject[]> {
  let result = await timingRequest
    .get<{ data: _IBTimingProject[] }>('/projects')
    .then((response) => {
      return response.data.data.map(createTimgProjectFactory);
    });

  return result;
}
