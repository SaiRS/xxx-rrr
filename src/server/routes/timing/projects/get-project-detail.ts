import { timingRequest } from '../base';
import { Router, Response, Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Serializer, Error as SerializerError } from 'jsonapi-serializer';
import { SLogger } from '@sutils/logger';
import uuid from 'uuid';

interface IParam extends ParamsDictionary {
  projectId: string;
}

/**
 * 获取项目详情
 * @export
 * @param {Router} router
 * @returns {Router}
 */
export function makeTimingGetProjectDetailRouter(router: Router): Router {
  router.post('/projects/:projectId', function projectDetail(
    req: Request<IParam>,
    res: Response,
  ) {
    let projectId = req.params.projectId;
    timingRequest
      .get(`/projects/${projectId}`)
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
            pointer: `/projects/${projectId}`,
            parameter: JSON.stringify(req.params),
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
