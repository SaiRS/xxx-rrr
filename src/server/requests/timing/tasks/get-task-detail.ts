import { timingRequest } from '../base';
import { IFTimingTask } from '@root/src/types';

/**
 * 获取timing task的详情
 * @export
 * @param {string} taskId
 * @returns
 */
export async function getTimingTaskDetail(taskId: string) {
  return await timingRequest
    .get<{ data: IFTimingTask }>(`/time-entries/${taskId}`)
    .then((response) => {
      return response.data.data;
    });
}
