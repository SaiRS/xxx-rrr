import { Resolver, Query, Args, Mutation, Arg } from 'type-graphql';
import { IFTimingTask } from '@root/src/types';
import {
  getTimingTasks,
  GetTimingTasksPayload,
  updateTimingTask,
  getTimingTaskDetail,
} from '@server/requests';

@Resolver()
export class TimingTaskResolvers {
  /**
   * 获取timing task 列表的graphql query定义
   * @param {GetTimingTasksPayload} payload
   * @returns {Promise<IFTimingTask[]>}
   * @memberof TimingTaskResolvers
   */
  @Query((returns) => [IFTimingTask])
  async taskList(
    @Args() payload: GetTimingTasksPayload,
  ): Promise<IFTimingTask[]> {
    return getTimingTasks(payload);
  }

  /**
   * 获取timing task 的graphql query定义
   * @param {string} taskId
   * @returns
   * @memberof TimingTaskResolvers
   */
  @Query((returns) => IFTimingTask)
  async getTimingTaskDetail(
    @Arg('taskId') taskId: string,
  ): Promise<IFTimingTask> {
    return getTimingTaskDetail(taskId);
  }

  /**
   * 更新timing task信息的graphql mutaion定义
   * @param {string} taskId
   * @param {Omit<IFTimingTask, 'id'>} payload
   * @returns
   * @memberof TimingTaskResolvers
   */
  @Mutation((returns) => IFTimingTask)
  async updateTimingTask(
    @Arg('taskId') taskId: string,
    payload: Omit<IFTimingTask, 'id'>,
  ) {
    return updateTimingTask(taskId, payload);
  }
}
