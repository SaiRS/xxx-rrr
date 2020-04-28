import { _IBTimingTask } from './../adaptors/task-types';
import { timingRequest } from '../base';
import { IFTimingTask } from '@root/src/types';
import { createTimingTaskFactory } from '../adaptors/task-adaptors';

/**
 * 更新timing中task的信息
 * @export
 * @param {string} taskId task id
 * @param {Omit<IFTimingTask, 'id'>} payload 请求的payload
 * @returns {(Promise<IFTimingTask | null>)} 更新后的task信息，如果没有，或者失败，则返回null
 */
export async function updateTimingTask(
  taskId: string,
  payload: Partial<Omit<IFTimingTask, 'id'>>,
): Promise<IFTimingTask | null> {
  return await timingRequest
    .put<{ data: _IBTimingTask | null }>(`/time-entries/${taskId}`, payload)
    .then((response) => {
      if (response.data.data) {
        return createTimingTaskFactory(response.data.data);
      }
      return null;
    });
}
