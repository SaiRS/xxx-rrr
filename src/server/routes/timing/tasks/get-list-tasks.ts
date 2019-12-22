import { timingRequest } from '../base';
import { Router, Response, Request } from 'express';

import { Serializer, Error as SerializerError } from 'jsonapi-serializer';
import { SLogger } from '@sutils/logger';
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

/**
 * @export
 *
 * @param {Router} router
 * @returns {Router}
 */
export function makeTimingGetListTasksRouter(router: Router): Router {
  router.post('/time-entries', function taskList(req: Request, res: Response) {
    timingRequest
      .get('/time-entries', req.query)
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
            pointer: '/time-entries',
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
