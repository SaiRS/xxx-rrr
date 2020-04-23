import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';
import { CreateTimingProjectPayload } from './create-project';

/**
 * 更新项目(除了parent结构不能修改之外，其他均可修改)
 * payload中没有传入的参数将不会被修改
 * @export
 * @param {string} projectId
 * @param {Omit<CreateTimingProjectPayload, 'parentId'>} payload
 * @returns
 */
export async function updateTimingProject(
  projectId: string,
  payload: Omit<CreateTimingProjectPayload, 'parentId'>,
) {
  return await timingRequest
    .put<{ data: IFTimingProject }>(`/projects/${projectId}`, payload)
    .then((response) => {
      return response.data.data;
    });
}
