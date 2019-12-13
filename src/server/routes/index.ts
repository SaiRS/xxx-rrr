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
    let importedRoutes: Record<string, any> = require(path.resolve(file));
    try {
      // 获取values
      let keys = Object.keys(importedRoutes);
      for (let key of keys) {
        if (Array.isArray(importedRoutes[key])) {
          for (let route of importedRoutes[key]) {
            routeSchema.validate(route);
            // 添加
            _routes.push(route);
          }
        } else {
          routeSchema.validate(importedRoutes[key]);
          // 添加
          _routes.push(importedRoutes[key]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

export const routes = _.flattenDeep(_routes);
