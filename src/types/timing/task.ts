import { ObjectType, Field, ID, Int } from 'type-graphql';
import { IFTimingProjectProfile, IFTimingProject } from './project';

/**
 * timing中task的定义
 * @export
 * @class IFTimingTask
 */
@ObjectType()
export class IFTimingTask {
  @Field((type) => ID)
  id!: string;

  /**
   * 开始时间, 格式：2019-01-01T00:00:00+00:00
   * @type {string}
   * @memberof IFTimingTask
   */
  @Field((type) => String)
  start_date!: string;

  /**
   * 结束时间，格式: 2019-01-01T00:00:00+00:00
   * @type {string}
   * @memberof IFTimingTask
   */
  @Field((type) => String)
  end_date!: string;

  /**
   * 时长，单位(s)
   * @type {number}
   * @memberof IFTimingTask
   */
  @Field((type) => Int)
  duration!: number;

  /**
   * 标题
   * @type {string}
   * @memberof IFTimingTask
   */
  @Field((type) => String, { nullable: true })
  title?: string;

  /**
   * 备注
   * @type {string}
   * @memberof IFTimingTask
   */
  @Field((type) => String, { nullable: true })
  notes?: string;

  /**
   * 是否在运行中
   * @type {boolean}
   * @memberof IFTimingTask
   */
  @Field((type) => Boolean)
  is_running!: boolean;

  // NOTE: 联合类型怎么写？这样子可行？事实证明不行
  // 那有多个情况的怎么处理?
  @Field((type) => IFTimingProjectProfile)
  project!: IFTimingProjectProfile | IFTimingProject;
}
