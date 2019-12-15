import { Router, Request, Response } from 'express';
import * as yup from 'yup';

import { SLogger } from '@sutils/logger';
import { TagModal } from '@server/database';

import { Serializer } from 'jsonapi-serializer';

// 让数据符合JSON:API格式
const TagsSerializer = new Serializer('tags', { attributes: ['name'] });

const CreateTagSchema = yup.object({
  name: yup.string().required(),
  groupName: yup.string().default(''),
  color: yup.string(),
  parent: yup.string().default(''),
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

    CreateTagSchema.validate(req.body.params)
      .then(async () => {
        // 保存数据库
        let tagDoc = new TagModal(req.body.params);
        let result = await tagDoc.save();
        res.json(result);
      })
      .catch((error: Error) => {
        SLogger.error(error);
        res.json({
          error: error.message,
        });
      });
  });

  return router;
}
