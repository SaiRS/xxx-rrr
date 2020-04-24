import { ArgsType, Field } from 'type-graphql';
import { Min, Max } from 'class-validator';
import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';
import { _IBTimingProject, createTimgProjectFactory } from '../adaptors';
import { getSelfLinkFromProjectId } from '../adaptors/utils';

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
export async function createTimingProject(
  payload: CreateTimingProjectPayload,
): Promise<IFTimingProject> {
  // 判断一下要不要修改parentId的值
  let copyPayload = { ...payload };
  if (copyPayload.parentId) {
    // @ts-ignore
    // 添加真正的请求参数 parent
    copyPayload['parent'] = {
      self: getSelfLinkFromProjectId(copyPayload.parentId),
    };

    Reflect.deleteProperty(copyPayload, 'parentId');
  }
  return await timingRequest
    .post<{ data: _IBTimingProject }>('projects', copyPayload)
    .then((response) => {
      return createTimgProjectFactory(response.data.data);
    });
}
