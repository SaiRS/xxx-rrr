import { getRequestVersionPath } from '../../utils';
import { rrrRequest } from '../../base';
import { IFTimingProject } from 'src/types';

/**
 * 获取timing中的projects列表
 * @export
 * @returns {Promise<IFTimingProject[]>} 层级关系的projects
 */
export async function getListProjects(): Promise<IFTimingProject[]> {
  const url = getRequestVersionPath('timing/projects');
  return await rrrRequest.post(url);
}
