import { Field, ID, ObjectType, Float } from 'type-graphql';

@ObjectType()
export class IFTimingProjectProfile {
  @Field((type) => ID)
  id!: string;
}

// 定义graphql中的schema
@ObjectType()
export class IFTimingProject {
  @Field((type) => ID)
  id!: string;

  @Field()
  title!: string;

  /**
   * 颜色，格式：#RRGGBB
   * @type {string}
   * @memberof IFTimingProject
   */
  @Field()
  color!: string;

  /**
   * 生产力分数, [-1, 1]之间
   * @type {number}
   * @memberof IFTimingProject
   */
  @Field((type) => Float)
  productivity_score!: number;

  @Field((type) => Boolean)
  is_archived!: boolean;

  @Field((type) => ID, { nullable: true })
  parentId?: string;

  @Field((type) => [IFTimingProjectProfile]!)
  children!: IFTimingProjectProfile[];

  constructor() {
    this.title = '';
  }
}
