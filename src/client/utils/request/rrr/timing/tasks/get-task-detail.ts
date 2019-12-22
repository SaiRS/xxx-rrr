import { getRequestVersionPath } from '../../utils';
import { rrrRequest } from '../../base';
import { IFTimingTask } from 'src/types';

/**
 * 获取timing中的任务列表
 * @export
 * @returns {Promise<IFTimingTask | null>} 层级关系的projects
 */
export async function getTaskDetail(
  activityId: string,
): Promise<IFTimingTask | null> {
  const url = getRequestVersionPath(`timing/time-entries/${activityId}`);
  return await rrrRequest.post(url);
}
