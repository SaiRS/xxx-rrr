import { SLogger } from '@sutils/logger';
import { TagModal } from '@server/database';
import { Router, Request, Response } from 'express';
import { Serializer } from 'jsonapi-serializer';

// 让数据符合JSON:API格式
const TagsSerializer = new Serializer('tags', {
  attributes: ['name', 'groupName'],
});

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
    let result = await TagModal.find();
    SLogger.debug('result', result);
    res.json(TagsSerializer.serialize(result));
  });
}