import { SLogger } from '@sutils/logger';
import { Router, Request, Response } from 'express';
import { getDBModel } from '@server/database/db-factory';
import { tagSerializer } from '@server/serializers';

/**
 * 定义获取tags的接口
 * @export
 * @param {Router} router express的router实例
 * @returns {Router} router express的router实例
 */
export function makeGetTagsRouter(router: Router): Router {
  // tags列表
  return router.get('/', async function getTags(req: Request, res: Response) {
    SLogger.debug('query', req.query);
    // 查询所有的tags
    let model = getDBModel('tags');
    let result = await model.find();
    SLogger.debug('result', result);

    res.json(tagSerializer(result.map((item) => item.toJSON())));
  });
}
