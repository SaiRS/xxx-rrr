import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';
import { CreateTimingProjectPayload } from './create-project';
import { _IBTimingProject, createTimgProjectFactory } from '../adaptors';
import { getSelfLinkFromProjectId } from '../adaptors/utils';

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
  payload: Partial<Omit<CreateTimingProjectPayload, 'parentId'>>,
): Promise<IFTimingProject | null> {
  return await timingRequest
    .put<{ data: _IBTimingProject | null }>(
      getSelfLinkFromProjectId(projectId),
      payload,
    )
    .then((response) => {
      if (response.data.data) {
        return createTimgProjectFactory(response.data.data);
      } else {
        return null;
      }
    });
}
