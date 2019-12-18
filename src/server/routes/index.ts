import glob from 'glob';
import path from 'path';
import _ from 'lodash';
import { Router } from 'express';

export interface RouterConfig {
  path: string;
  router: Router;
}

const _routes: RouterConfig[] = [];

// 获取server/routes文件夹下边的所有的以-route.ts或-route.js结尾的文件
// 把这些文件当作是路由的配置文件，统一起来集中管理
glob
  .sync(path.resolve(process.cwd(), 'src/server/routes/**/index.ts'))
  .forEach((file) => {
    let importedRoutes: Record<string, any> = require(path.resolve(file));
    // _routes.push(importedRoutes);
    try {
      // 获取values
      let keys = Object.keys(importedRoutes);
      for (let key of keys) {
        if (Array.isArray(importedRoutes[key])) {
          for (let obj of importedRoutes[key]) {
            // routeSchema.validate(route);
            if (obj.path && obj.router) {
              // 添加
              _routes.push(obj);
            }
          }
        } else {
          // routeSchema.validate(importedRoutes[key]);
          let obj = importedRoutes[key];
          if (obj.path && obj.router) {
            // 添加
            _routes.push(obj);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

export const routers = _.flattenDeep(_routes);
