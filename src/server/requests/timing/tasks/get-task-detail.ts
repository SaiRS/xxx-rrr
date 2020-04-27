import { timingRequest } from '../base';
import { IFTimingTask } from '@root/src/types';
import { _IBTimingTask } from '../adaptors/task-types';
import { createTimingTaskFactory } from '../adaptors/task-adaptors';

/**
 * 获取timing中的任务详情
 * @export
 * @param {string} taskId 任务id
 * @returns {(Promise<IFTimingTask | null>)} 返回的任务详情，如果没有或者出错，则返回null
 */
export async function getTimingTaskDetail(
  taskId: string,
): Promise<IFTimingTask | null> {
  return await timingRequest
    .get<{ data: _IBTimingTask | null }>(`/time-entries/${taskId}`)
    .then((response) => {
      if (response.data.data) {
        return createTimingTaskFactory(response.data.data);
      }
      return null;
    });
}
