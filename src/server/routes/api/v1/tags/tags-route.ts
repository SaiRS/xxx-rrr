import { SLogger } from '@sutils/logger';
import Joi from '@hapi/joi';
import { TagModal } from '@server/database';
import { Router, Request, Response } from 'express';
import { Serializer } from 'jsonapi-serializer';

// 让数据符合JSON:API格式
const TagsSerializer = new Serializer('tags', { attributes: ['name'] });

export function tagsRouter(router: Router): Router {
  return router.get('/', function tags(req: Request, res: Response) {
    res.json(
      TagsSerializer.serialize({
        name: 'xxx',
      }),
    );
  });
}
