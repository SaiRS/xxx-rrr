import { Field, ID, ObjectType, Float } from 'type-graphql';
import randomColor from 'randomcolor';
import { IsBoolean, IsNumberString, IsArray } from 'class-validator';

import {
  ValidateToBeColorStringDecorator,
  ValidateToBeStringDecorator,
  ValidateToBeNumberDecorator,
} from '@root/src/utils';

@ObjectType()
export class IFTimingProjectProfile {
  @Field((type) => ID)
  id!: string;
}

// 定义graphql中的schema
@ObjectType()
export class IFTimingProject extends IFTimingProjectProfile {
  @ValidateToBeStringDecorator('')
  @Field()
  title!: string;

  /**
   * 颜色，格式：#RRGGBB
   * @type {string}
   * @memberof IFTimingProject
   */
  @ValidateToBeColorStringDecorator()
  @Field()
  color!: string;

  /**
   * 生产力分数, [-1, 1]之间
   * @type {number}
   * @memberof IFTimingProject
   */
  @ValidateToBeNumberDecorator(0)
  @Field((type) => Float)
  productivity_score!: number;

  @Field((type) => Boolean)
  @IsBoolean()
  is_archived!: boolean;

  @Field((type) => ID, { nullable: true })
  @IsNumberString()
  parentId?: string | null;

  @Field((type) => [IFTimingProjectProfile]!)
  @IsArray()
  children!: IFTimingProjectProfile[];

  constructor() {
    super();
    this.title = '';
    this.color = randomColor();
    this.productivity_score = 0;
    this.is_archived = false;
    this.parentId = null;
    this.children = [];
  }
}
