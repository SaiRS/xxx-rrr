import { getRequestVersionPath } from '../../utils';
import { rrrRequest } from '../../base';
import { IFTimingProject } from 'src/types';

/**
 * 按层级关系获取timing中的projects
 * @export
 * @returns {Promise<IFTimingProject[]>} 层级关系的projects
 */
export async function getHierarchyProjects(): Promise<IFTimingProject[]> {
  const url = getRequestVersionPath('timing/projects/hierarchy');
  return await rrrRequest.post(url);
}
