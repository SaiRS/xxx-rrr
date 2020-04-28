import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';
import { IFTimingProject } from '@root/src/types';
import {
  getHierarchyProjectsRequest,
  getTimingProjects,
  getTimingProjectDetail,
  CreateTimingProjectPayload,
  createTimingProject,
  updateTimingProject,
} from '@server/requests';

@Resolver()
export class TimingProjectResolvers {
  /**
   * 以层级的形式获取项目信息
   * @returns {Promise<IFTimingProject[]>}
   * @memberof TimingProjectResolvers
   */
  @Query((returns) => [IFTimingProject])
  async hierarchyProjects(): Promise<IFTimingProject[]> {
    let result = await getHierarchyProjectsRequest();
    return result;
  }

  /**
   * 以列表的形式获取所有的项目信息，之前的层级结构被平铺展开
   * @returns {Promise<IFTimingProject[]>}
   * @memberof TimingProjectResolvers
   */
  @Query((retures) => [IFTimingProject])
  async listProjects(): Promise<IFTimingProject[]> {
    return await getTimingProjects();
  }

  /**
   * 获取项目的详情信息
   * @param {string} projectId
   * @returns
   * @memberof TimingProjectResolvers
   */
  @Query((returns) => IFTimingProject)
  async projectDetail(
    @Arg('projectId') projectId: string,
  ): Promise<IFTimingProject | null> {
    return await getTimingProjectDetail(projectId);
  }

  /**
   * 创建项目
   * @param {CreateTimingProjectPayload} payload
   * @memberof TimingProjectResolvers
   */
  @Mutation((returns) => IFTimingProject)
  async createTimingProject(
    @Args() payload: CreateTimingProjectPayload,
  ): Promise<IFTimingProject | null> {
    return await createTimingProject(payload);
  }

  /**
   * 更新项目
   * @param {string} projectId
   * @param {Omit<CreateTimingProjectPayload, 'parentId'>} payload
   * @returns
   * @memberof TimingProjectResolvers
   */
  @Mutation((returns) => IFTimingProject)
  async updateTimingProject(
    @Arg('projectId') projectId: string,
    payload: Omit<CreateTimingProjectPayload, 'parentId'>,
  ): Promise<IFTimingProject | null> {
    return await updateTimingProject(projectId, payload);
  }
}