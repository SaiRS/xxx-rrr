import { ObjectType, Field, ID, Int, createUnionType } from 'type-graphql';
import { IFTimingProjectProfile, IFTimingProject } from './project';
import {
  ValidateToBeDateStringDecorator,
  ValidateToBeNumberDecorator,
  ValidateToBeStringDecorator,
  ValidateToBeBooleanDecorator,
} from '@root/src/utils';
import { ITypeConvert } from '../type-convert';

/**
 * 解析后的task notes
 * @export
 * @class IFTimingTaskNotes
 */
@ObjectType()
export class IFTimingTaskNotes implements ITypeConvert {
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
    let tags: string[] = [];
    let goal = '';
    let notes = '';

    let tagResult = rawNote.match(/@tags:(?<tags>[^@]*)/im);
    // 标签
    // @ts-ignore
    if (tagResult && tagResult.groups.tags) {
      // @ts-ignore
      tags = tagResult.groups.tags
        .trimEnd()
        .trim()
        .split(',')
        .map((item) => item.trim().trimEnd());
    }

    let goalResult = rawNote.match(/@goal:(?<goal>[^@]*)/im);
    // @ts-ignore
    if (goalResult && goalResult.groups.goal) {
      // @ts-ignore
      goal = goalResult.groups.goal.trim().trimEnd();
    }

    let notesResult = rawNote.match(/@notes:(?<notes>[^@]*)/im);
    // @ts-ignore
    if (notesResult && notesResult.groups.notes) {
      // @ts-ignore
      notes = notesResult.groups.notes.trim().trimEnd();
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

  toObject() {
    return {
      tags: this.tags,
      goal: this.goal,
      notes: this.notes,
    };
  }
}

/**
 * 创建联合类型
 * 在获取task信息时，会根据参数的不同，而携带或者不携带项目信息
 */
const ProjectInTaskUnion = createUnionType({
  name: 'ProjectInTaskUnion',
  types: () => [IFTimingProjectProfile, IFTimingProject],
  resolveType: (value) => {
    // 解析方法，使用title来判断
    // 使得可以在gql语法中使用
    // ... on IFTimingProject {}
    // ... on IFTimingProjectProfile {}
    if ('title' in value) {
      return IFTimingProject;
    }
    return IFTimingProjectProfile;
  },
});

/**
 * timing中task的定义
 * @export
 * @class IFTimingTask
 */
@ObjectType()
export class IFTimingTask implements ITypeConvert {
  static type: string = 'time-entries';

  type: string;

  @Field((type) => ID)
  id!: string;

  /**
   * 开始时间, 格式：2019-01-01T00:00:00+00:00
   * @type {string}
   * @memberof IFTimingTask
   */
  @ValidateToBeDateStringDecorator()
  @Field((type) => String)
  start_date!: string;

  /**
   * 结束时间，格式: 2019-01-01T00:00:00+00:00
   * @type {string}
   * @memberof IFTimingTask
   */
  @ValidateToBeDateStringDecorator()
  @Field((type) => String)
  end_date!: string;

  /**
   * 时长，单位(s)
   * @type {number}
   * @memberof IFTimingTask
   */
  @ValidateToBeNumberDecorator()
  @Field((type) => Int)
  duration!: number;

  /**
   * 标题
   * @type {string}
   * @memberof IFTimingTask
   */
  @ValidateToBeStringDecorator()
  @Field((type) => String, { nullable: true })
  title?: string;

  /**
   * 任务note
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
  @ValidateToBeBooleanDecorator()
  @Field((type) => Boolean)
  is_running!: boolean;

  // NOTE: 此时需要联合类型
  @Field((type) => ProjectInTaskUnion)
  project!: IFTimingProjectProfile | IFTimingProject;

  constructor() {
    this.type = IFTimingTask.type;
    this.title = '';
    this.notes = new IFTimingTaskNotes();
    this.is_running = false;
  }

  toObject() {
    return {
      id: this.id,
      start_date: this.start_date,
      end_date: this.end_date,
      duration: this.duration,
      title: this.title,
      notes: this.notes.toObject(),
      is_running: this.is_running,
      project: this.project.toObject(),
    };
  }
}
