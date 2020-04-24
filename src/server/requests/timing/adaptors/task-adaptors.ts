import { _IBTimingTask } from './task-types';
import { IFTimingTask, IFTimingTaskNotes } from '@root/src/types';
import { getTaskIdFromSelfLink } from './utils';
import {
  createTimgProjectFactory,
  createTimingProjectProfileFactory,
} from './project-adaptors';
import { _IBTimingProject } from './project-types';

/**
 * 从timing返回的task信息中生成IFTimingTask实例
 * @export
 * @param {_IBTimingTask} bInfo timing接口返回的任务信息
 * @returns {IFTimingTask | null} IFTimingTask实例/null
 */
export function createTimingTaskFactory(
  bInfo: _IBTimingTask,
): IFTimingTask | null {
  let task = new IFTimingTask();

  task.id = getTaskIdFromSelfLink(bInfo.self) as string;
  task.title = bInfo.title;

  task.start_date = bInfo.start_date;
  task.end_date = bInfo.end_date;
  task.duration = bInfo.duration;

  task.is_running = bInfo.is_running;

  // 使用title来判断
  // @ts-ignore
  task.project = bInfo.project.title
    ? createTimgProjectFactory(bInfo.project as _IBTimingProject)
    : createTimingProjectProfileFactory(bInfo.project);

  let notes = IFTimingTaskNotes.from(bInfo.notes);
  task.notes = notes;

  return task;
}
