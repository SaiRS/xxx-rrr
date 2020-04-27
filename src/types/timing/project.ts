import { Field, ID, ObjectType, Float } from 'type-graphql';
import randomColor from 'randomcolor';
import { IsBoolean, IsNumberString, IsArray } from 'class-validator';

import {
  ValidateToBeColorStringDecorator,
  ValidateToBeStringDecorator,
  ValidateToBeNumberDecorator,
} from '@root/src/utils';
import { ITypeConvert } from '../type-convert';

@ObjectType()
export class IFTimingProjectProfile implements ITypeConvert {
  static type: string = 'projects';
  type: string;

  @Field((type) => ID)
  @ValidateToBeStringDecorator()
  id!: string;

  valueOf() {
    return this.toObject();
  }

  toObject() {
    return {
      id: this.id,
    };
  }

  constructor() {
    this.type = IFTimingProjectProfile.type;
  }
}

// 定义graphql中的schema
@ObjectType()
export class IFTimingProject extends IFTimingProjectProfile
  implements ITypeConvert {
  @ValidateToBeStringDecorator()
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
  @ValidateToBeNumberDecorator()
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

  toObject() {
    return {
      ...super.toObject(),
      title: this.title,
      color: this.color,
      productivity_score: this.productivity_score,
      is_archived: this.is_archived,
      parentId: this.parentId,
      children: this.children.map((item) => item.toObject()),
    };
  }
}
