import { timingRequest } from '../base';
import { Field, ArgsType } from 'type-graphql';
import { IFTimingTask } from '@root/src/types';

@ArgsType()
export class GetTimingTasksPayload {
  /**
   * 开始时间
   * @type {string}
   * @memberof GetTimingTasksPayload
   */
  @Field((type) => String, { nullable: true })
  start_date_min?: string; // 格式为：2019-01-01T00:00:00+00:00

  /**
   * 结束时间
   * @type {string}
   * @memberof GetTimingTasksPayload
   */
  @Field((type) => String, { nullable: true })
  start_date_max?: string; // 格式为：2019-01-01T00:00:00+00:00

  /**
   * 项目id的集合，如果提供，则最终的结果将限制在这些项目里边
   * @type {string[]}
   * @memberof GetTimingTasksPayload
   */
  @Field((type) => [String], { nullable: true })
  projectIds?: string[];

  /**
   * 匹配任务的title或者note是否包含这个参数所含的值
   *
   * 大小写不敏感
   * @type {string}
   * @memberof GetTimingTasksPayload
   */
  @Field((type) => String, { nullable: true })
  search_query?: string;

  /**
   * 如果指定的话，那就在running/no running下去匹配对应的任务
   * @type {boolean}
   * @memberof GetTimingTasksPayload
   */
  @Field((type) => Boolean, { nullable: true })
  is_running?: boolean;

  /**
   * 返回的信息中是否携带project的信息
   * @type {boolean}
   * @memberof GetTimingTasksPayload
   */
  @Field((type) => Boolean, { nullable: true })
  include_project_data?: boolean;

  /**
   * 如果为true,则返回的结果会携带上在projectIds指定项目的子项目下的所有tasks
   * @type {boolean}
   * @memberof GetTimingTasksPayload
   */
  @Field((type) => Boolean, { nullable: true })
  include_child_projects?: boolean;
}

/**
 * 获取task列表
 * @export
 * @param {GetTimingTasksPayload} payload
 * @returns
 */
export async function getTimingTasks(payload: GetTimingTasksPayload) {
  return await timingRequest
    .get<{ data: IFTimingTask[] }>('/time-entries', {
      params: payload,
    })
    .then((response) => {
      // TODO: 适配层
      // 直接返回
      return response.data.data;
    });
}
