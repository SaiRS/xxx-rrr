import { timingRequest } from './../base';
import { Router, Response, Request } from 'express';

import { SLogger } from '@sutils/logger';

import { Serializer, Error as SerializerError } from 'jsonapi-serializer';
import uuid from 'uuid';

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
        // 序列化错误
        let serialedError = new SerializerError({
          id: uuid(),
          status: '500',
          code: 'xxx',
          title: '',
          detail: error.message,
          source: {
            pointer: '/projects/hierarchy',
            parameter: JSON.stringify(req.query),
          },
          links: {},
          meta: {},
        });
        // 记录错误
        SLogger.error(serialedError);

        res.status(500).json(serialedError);
      });
  });

  return router;
}
