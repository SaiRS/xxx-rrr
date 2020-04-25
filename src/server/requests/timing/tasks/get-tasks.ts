import { timingRequest } from '../base';
import { Field, ArgsType } from 'type-graphql';
import { IFTimingTask, PaginationEdge } from '@root/src/types';
import { validateToBeArray, validateToBePlainObject } from '@root/src/utils';
import { _IBTimingTask } from '../adaptors/task-types';
import { createTimingTaskFactory } from '../adaptors/task-adaptors';
import { PaginationResponse } from '@root/src/types';

import { Base64 } from 'js-base64';

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
 * 获取任务列表时的meta信息
 * 接口符合JSON:API的规范
 * @interface _IBTaskListMeta
 */
interface _IBTaskListMeta {
  current_page: number;
  from: number;
  last_page: number;
  // path: 'https://web.timingapp.com/api/v1/time-entries';
  per_page: number; // page size
  to: number;
  total: number;
}

/**
 * task分页信息中task edge的信息
 * @export
 * @class IFTaskPaginationEdge
 * @extends {PaginationEdge(IFTimingTask)}
 */
export class IFTaskPaginationEdge extends PaginationEdge(IFTimingTask) {}

/**
 * task的分页信息
 * @export
 * @class IFTaskPagination
 * @extends {PaginationResponse(
 *   IFTaskPaginationEdge,
 * )}
 */
export class IFTaskPagination extends PaginationResponse(
  IFTaskPaginationEdge,
) {}

/**
 * 获取task列表
 * @export
 * @param {GetTimingTasksPayload} payload
 * @returns
 */
export async function getTimingTasks(
  payload: GetTimingTasksPayload = {},
): Promise<IFTaskPagination> {
  return await timingRequest
    .get<{ data: _IBTimingTask[]; meta: _IBTaskListMeta }>('/time-entries', {
      params: payload,
    })
    .then((response) => {
      // 适配
      let list = validateToBeArray<_IBTimingTask>(response.data.data);
      let meta = validateToBePlainObject(response.data.meta) as _IBTaskListMeta;

      return createTaskPaginationFrom(list, meta);
    });
}

function createTaskPaginationFrom(
  list: _IBTimingTask[],
  meta: _IBTaskListMeta,
): IFTaskPagination {
  let taskPagination = new IFTaskPagination();

  taskPagination.totalCount = meta.total;

  // page info
  taskPagination.pageInfo.currentCursor = Base64.encode(meta.current_page + '');
  taskPagination.pageInfo.endCursor = Base64.encode(meta.last_page + '1');
  taskPagination.pageInfo.hasNextPage = meta.current_page === meta.last_page;
  taskPagination.pageInfo.startCursor = Base64.encode('1');

  // edges
  taskPagination.edges = list
    .map((item) => {
      let node = createTimingTaskFactory(item);
      if (node) {
        let edge = new IFTaskPaginationEdge();

        edge.node = node;
        edge.cursor = Base64.encode(meta.current_page + '');

        return edge;
      } else {
        return null;
      }
    })
    .filter(function filter(item): item is IFTaskPaginationEdge {
      return !!item;
    });

  return taskPagination;
}
