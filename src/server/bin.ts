import Hapi from 'hapi';
import { validate } from './auth';

import './database/connection';

const server = new Hapi.Server({
  port: 8686,
  host: 'localhost',
});

const init = async () => {
  // 注册静态页面的插件（路径相对于public)
  await server.register(require('inert'));
  // 注册日志插件
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true,
      logEvents: ['response', 'onPostStart'],
    },
  });

  await server.register([
    {
      // 服务器状态监测
      plugin: require('hapijs-status-monitor'),
    },
    {
      // 注册vision插件
      plugin: require('@hapi/vision'),
    },
    {
      // 注册swagger插件
      plugin: require('hapi-swagger'),
      options: {
        info: {
          title: 'Test API Documentation',
          version: '1.0.0',
        },
      },
    },
  ]);

  // 授权插件
  await server.register(require('hapi-auth-basic'));
  server.auth.strategy('simple', 'basic', { validate });

  server.route({
    method: 'GET',
    path: '/',
    options: {
      // auth: 'simple',
      // 文档有关的配置
      description: 'Get todo',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'], // ADD THIS TAG
    },
    handler: (request, h) => {
      return 'welcome';
    },
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
