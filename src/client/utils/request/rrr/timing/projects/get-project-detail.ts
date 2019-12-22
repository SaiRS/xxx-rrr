import { getRequestVersionPath } from '../../utils';
import { rrrRequest } from '../../base';
import { IFTimingProject } from 'src/types';

/**
 * 获取timing中的project详情
 * @export
 * @returns {Promise<IFTimingProject ｜ null>} 层级关系的projects
 */
export async function getProjectDetail(
  projectId: string,
): Promise<IFTimingProject | null> {
  const url = getRequestVersionPath(`timing/projects/${projectId}`);
  return await rrrRequest.post(url);
}
