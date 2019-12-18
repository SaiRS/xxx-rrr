import { timingRequest } from './../base';
import { Router, Response, Request } from 'express';

import { Serializer } from 'jsonapi-serializer';

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

export function makeTimingGetHierarchyProjectsRouter(router: Router): Router {
  router.post('/projects/hierarchy', function projectHierarachy(
    req: Request,
    res: Response,
  ) {
    timingRequest
      .get('/projects/hierarchy')
      .then((response) => {
        // TODO: 适配层
        // 直接返回
        res.json(response.data);
      })
      .catch((error: Error) => {
        // TODO: 处理错误
        // res.e;
        res.json({
          error: {
            message: error.message,
          },
        });
      });
  });

  return router;
}
