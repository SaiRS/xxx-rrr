import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';
import { _IBTimingProject, createTimgProjectFactory } from '../adaptors';
import { getSelfLinkFromProjectId } from '../adaptors/utils';

/**
 * 获取项目详情
 * @export
 * @param {Router} router
 * @returns {Router}
 */
export async function getTimingProjectDetail(
  projectId: string,
): Promise<IFTimingProject | null> {
  return await timingRequest
    .get<{ data: _IBTimingProject | null }>(getSelfLinkFromProjectId(projectId))
    .then((response) => {
      if (response.data.data) {
        // 适配
        return createTimgProjectFactory(response.data.data);
      } else {
        return null;
      }
    });
}
