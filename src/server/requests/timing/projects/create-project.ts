import { ArgsType, Field } from 'type-graphql';
import { Min, Max } from 'class-validator';
import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';

@ArgsType()
export class CreateTimingProjectPayload {
  @Field((type) => String)
  title!: string; // 标题

  @Field((type) => String, { nullable: true })
  parentId?: string; // 父项目ID

  @Field((type) => String, { nullable: true })
  color?: string; // 颜色,如#RRGGBB

  @Field((type) => Number, { nullable: true, defaultValue: 1 })
  @Min(-1)
  @Max(1)
  productivity_score?: number; // 生产力分数[-1, 1], 默认为1

  @Field((type) => Boolean, { nullable: true, defaultValue: false })
  is_archived?: boolean;
}

/**
 * 创建项目
 * @export
 * @param {CreateTimingProjectPayload} payload
 * @returns
 */
export async function createTimingProject(payload: CreateTimingProjectPayload) {
  return await timingRequest
    .post<{ data: IFTimingProject }>('projects', payload)
    .then((response) => {
      return response.data.data;
    });
}
