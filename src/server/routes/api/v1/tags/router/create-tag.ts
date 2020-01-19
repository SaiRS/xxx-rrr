import { Router, Request, Response } from 'express';
import * as yup from 'yup';

import { SLogger } from '@sutils/logger';

import { getDBModel } from '@server/database/db-factory';
import { tagSerializer, errorSerializer } from '@sutils/serializer';
import { IRDocument } from '@server/database/interface-define';

const CreateTagSchema = yup.object({
  name: yup.string().required(),
  color: yup.string(),
});

/**
 * 创建 创建tag的router
 * @param {Router} router router实例
 * @returns {Router} router实例
 */
export function makeCreateTagRouter(router: Router): Router {
  router.post('/', function createTag(req: Request, res: Response) {
    // 从body中获取请求参数
    SLogger.debug(req.body);

    CreateTagSchema.validate(req.body)
      .then(() => {
        // 保存数据库
        let model = getDBModel('tags');
        let tagDoc = model.createDocument(req.body);

        tagDoc.save().then((result: IRDocument) => {
          // TagsSerializer
          res.json(tagSerializer(result.toJSON()));
        });
      })
      .catch((error: Error) => {
        let serializedError = errorSerializer(error);

        SLogger.error(error, serializedError);
        res.json(serializedError);
      });
  });

  return router;
}
