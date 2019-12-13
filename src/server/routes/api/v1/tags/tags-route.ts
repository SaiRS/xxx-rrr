import { ServerRoute, Request, ResponseToolkit, Lifecycle } from 'hapi';
import { SLogger } from '@sutils/logger';
import Joi from '@hapi/joi';
import { TagModal } from '@server/database';
/*
 * @Author: xjiaxiang86@gmail.com
 * @Date: 2019-12-10 16:27:38
 * @Last Modified by: xjiaxiang86@gmail.com
 * @Last Modified time: 2019-12-13 17:03:04
 */

interface ITagsQuery {
  page?: number;
  pageSize?: number;
}

/**
 * 提供给客户端用来获取tags列表的接口
 */
const tags: ServerRoute = {
  path: '/v1/tags',
  method: 'GET',
  options: {
    validate: {
      query: {
        page: Joi.number()
          .integer()
          .min(1)
          .default(1)
          .optional()
          .description('页码'),
        pageSize: Joi.number()
          .integer()
          .min(1)
          .max(1000)
          .default(100)
          .optional()
          .description('一页的容量'),
      },
    },
    // 文档有关的配置
    description: '获取标签列表',
    notes: '获取标签列表, 通过query string携带page和pageSize来指定获取范围',
    tags: ['api'], // ADD THIS TAG
  },
  handler: (
    request: Request,
    h: ResponseToolkit,
    err?: Error,
  ): Lifecycle.ReturnValue => {
    SLogger.info('---------', request.params, request.query);

    // TagModal.find().limit(request.query.pageSize);
    return [];
  },
};
export default tags;
