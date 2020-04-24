import { ObjectType, Field, ID, Int } from 'type-graphql';
import { IFTimingProjectProfile, IFTimingProject } from './project';

/**
 * 解析后的task notes
 * @export
 * @class IFTimingTaskNotes
 */
@ObjectType()
export class IFTimingTaskNotes {
  /**
   * 任务相关的tags
   * @type {string[]}
   * @memberof IFTimingTaskNotes
   */
  @Field((type) => [String])
  tags: string[];

  /**
   * 任务的goal
   * @type {string}
   * @memberof IFTimingTaskNotes
   */
  @Field((type) => String, { nullable: true })
  goal: string;

  /**
   * 任务的备注
   * @type {string}
   * @memberof IFTimingTaskNotes
   */
  @Field((type) => String)
  notes: string;

  @Field((type) => String)
  raw: string;

  /**
   * 从字符串形式的notes解析出IFTimingTaskNotes
   * @static
   * @param {string} rawNote 字符串形式的note
   * @returns {IFTimingTaskNotes} IFTimingTaskNotes实例
   * @memberof IFTimingTaskNotes
   * @example
   */
  static from(rawNote: string): IFTimingTaskNotes {
    if (typeof rawNote !== 'string') {
      return new IFTimingTaskNotes();
    }

    // 解析
    let reg = /(?:@tags:(?<tags>[^@]*))?\s{0,}(?:@goal:(?<goal>[^@]*))?\s{0,}(?:@notes:(?<notes>.*))?/im;
    let result = rawNote.match(reg);

    let tags: string[] = [];
    let goal = '';
    let notes = '';

    if (result) {
      // 标签
      // @ts-ignore
      if (result.groups.tags) {
        // @ts-ignore
        tags = result.groups.tags
          .trimEnd()
          .trim()
          .split(',')
          .map((item) => item.trim().trimEnd());
      }

      // @ts-ignore
      if (result.groups.goal) {
        // @ts-ignore
        goal = result.groups.goal.trim().trimEnd();
      }

      // @ts-ignore
      if (result.groups.notes) {
        // @ts-ignore
        notes = result.groups.notes.trim().trimEnd();
      }
    }

    let taskNode = new IFTimingTaskNotes();

    taskNode.goal = goal;
    taskNode.notes = notes;
    taskNode.tags = tags;
    taskNode.raw = rawNote;

    return taskNode;
  }

  /**
   * 将实例装换成字符串形式
   *
   * 保存到timing数据库中会执行此操作
   * @example
   * @returns {string}
   * @memberof IFTimingTaskNotes
   */
  toString(): string {
    let tags = '@tags: ';
    let goal = '@goal: ';
    let note = '@notes: ';

    tags += this.tags.join(', ');
    goal += this.goal;
    note += this.notes;

    return `${tags}\n${goal}\n${note}`;
  }

  constructor() {
    this.tags = [];
    this.goal = '';
    this.notes = '';

    this.raw = '';
  }
}

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
  @Field((type) => IFTimingTaskNotes)
  notes!: IFTimingTaskNotes;

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
