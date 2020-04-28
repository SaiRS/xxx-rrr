import swaggerUi from 'swagger-ui-express';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import config from './swagger.json';

export function enableSwaggerDocServer(app: express.Express) {
  let option: swaggerJSDoc.Options = {
    apis: ['../routes/api/**/*.ts'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'xxx-rrr项目接口文档', // Title (required)
        version: '1.0.0', // Version (required)
        description: '所有用于xxx-rrr项目中的接口',
      },
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'xjx',
        url: 'https://swagger.io',
        email: 'xjiaxiang86@gmail.com',
      },
      servers: [
        {
          // 目前开启的接口服务器
          url: 'http://localhost:8686/api/v1',
        },
      ],
    },
  };
  app.use(
    '/api-doc',
    swaggerUi.serve,
    swaggerUi.setup(config, {
      isExplorer: true,
    }),
  );
}
