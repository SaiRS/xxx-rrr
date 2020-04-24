import 'reflect-metadata';

import { finalMockSchema } from '@server/resolvers/mock-resolvers';
import http from 'http';

import express from 'express';
import graphqlHTTP from 'express-graphql';

// import getHierarchyProjectsRequest from '@server/requests/timing/projects/get-hierarchy-projects';
// jest.mock('@server/requests/timing/projects/get-hierarchy-projects');

// // @ts-ignore
// getHierarchyProjectsRequest.mockResolvedValue([]);

const port = 4001;
function createServer() {
  const app = express();

  app.use(
    '/graphql',
    graphqlHTTP({
      // NOTE: 这里实现mock
      schema: finalMockSchema,
      graphiql: true,
    }),
  );

  app.set('port', port);

  const server = http.createServer(app);
  server.listen(port);
  // @ts-ignore
  global.httpServer = server;
}

module.exports = async (globalConfig) => {
  createServer();
  // createClient();
};
