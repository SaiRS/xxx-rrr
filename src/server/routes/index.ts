import glob from 'glob';
import path from 'path';
import _ from 'lodash';
import { ServerRoute } from 'hapi';
import Joi from '@hapi/joi';

// 定义route的schema
const routeSchema = Joi.object({
  path: Joi.string().required(),
  method: Joi.string().required(),
});

const _routes: ServerRoute[] = [];

// 获取server/routes文件夹下边的所有的以-route.ts或-route.js结尾的文件
// 把这些文件当作是路由的配置文件，统一起来集中管理
glob
  .sync(path.resolve(process.cwd(), 'src/server/routes/**/*-route.{ts,js}'))
  .forEach((file) => {
    let importedRoutes = require(path.resolve(file));

    try {
      if (Array.isArray(importedRoutes)) {
        for (let route of importedRoutes) {
          routeSchema.validate(route);
        }
      } else {
        routeSchema.validate(importedRoutes);
      }
      // 添加
      _routes.push(require(path.resolve(file)));
    } catch (error) {
      console.error(error);
    }
  });

export const routes = _.flattenDeep(_routes);
