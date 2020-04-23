import { timingRequest } from '../base';
import { IFTimingProject } from '@root/src/types';

// new Serializer()

// interface IBTimingProject {
//   self: string; // link链接
//   title: string;
//   title_chain: string[]; // 名字的层级顺序
//   color: string; // 颜色
//   productivity_score: number; // 0 ~ 1, 生产力分数
//   is_archived: boolean; // 是否归档
//   parent: {
//     self: string;
//   } | null;
//   children: IBTimingProject[];
// }

/**
 * 以列表形式返回所有的项目信息
 * @export
 * @returns {Promise<IFTimingProject[]>} 所有的项目信息
 */
export async function getTimingProjects(): Promise<IFTimingProject[]> {
  let result = await timingRequest
    .get<{ data: IFTimingProject[] }>('/projects')
    .then((response) => {
      return response.data.data;
    });

  return result;
}
