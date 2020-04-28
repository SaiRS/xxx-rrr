import { getRequestVersionPath } from '../../utils';
import { rrrRequest } from '../../base';
import { IFTimingTask } from 'src/types';

/**
 * 获取timing中的任务列表
 * @export
 * @returns {Promise<IFTimingTask[]>} 层级关系的projects
 */
export async function getListTasks(): Promise<IFTimingTask[]> {
  const url = getRequestVersionPath('timing/time-entries');
  return await rrrRequest.post(url);
}
