import { timingRequest } from '../base';
import { IFTimingTask } from '@root/src/types';

/**
 * 更新timing中的任务信息
 * @export
 * @param {string} taskId
 * @param {Omit<IFTimingTask, 'id'>} payload
 * @returns
 */
export async function updateTimingTask(
  taskId: string,
  payload: Omit<IFTimingTask, 'id'>,
) {
  return await timingRequest
    .put<{ data: IFTimingTask }>(`/time-entries/${taskId}`, payload)
    .then((response) => {
      return response.data.data;
    });
}
