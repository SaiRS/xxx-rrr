import { Router, Request, Response } from 'express';
import { getDBModel } from '@server/database/db-factory';

import { SLogger } from '@sutils/logger';
import { errorSerializer } from '@sutils/serializer';
import { Serializer } from 'jsonapi-serializer';

// 让数据符合JSON:API格式
const TagsSerializer = new Serializer('tags', { attributes: ['name'] });

export function makeUpdateTagsRouter(router: Router): Router {
  router.patch('/:tagId', async function updateTags(
    req: Request<{ tagId: string }>,
    res: Response,
  ) {
    try {
      let tagId = req.params.tagId;

      // 更新的数据

      let model = getDBModel('tags');
      let query = model.createQuery();
      query.equalTo('id', tagId);

      let doc = await query.findOne();

      if (!doc) {
        let err = errorSerializer(new Error('没找到对象'));
        SLogger.error(err);
        res.json(err);
      } else {
        let keys = Object.keys(req.body);
        for (let key of keys) {
          doc.set(key, req.body[key]);
        }

        let newDoc = await doc.save();
        res.json(TagsSerializer.serialize(newDoc.toJSON()));
      }
    } catch (error) {
      let serializedError = errorSerializer(error);
      SLogger.error(error, serializedError);
      res.json(serializedError);
    }
  });

  return router;
}
