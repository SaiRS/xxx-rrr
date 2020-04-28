// type-graphql的依赖
import 'reflect-metadata';
import 'cross-fetch/polyfill';

import gql from 'graphql-tag';
import { IFTimingProject } from '@root/src/types';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

// @ts-ignore
let client: ApolloClient<NormalizedCacheObject>;
function createClient() {
  const cache = new InMemoryCache();
  const link = new HttpLink({
    uri: 'http://localhost:4001/graphql',
    // fetch: fetch,
  });
  client = new ApolloClient({
    cache,
    link,
  });
}

beforeAll((done) => {
  // 创建客户端
  createClient();
  done();
});

afterAll((done) => {
  done();
});

test('测试hierarchyProjects', async () => {
  let results = await client.query<{
    hierarchyProjects: IFTimingProject[];
  }>({
    query: gql`
      query Demo {
        # resolver root
        hierarchyProjects {
          title
        }
      }
    `,
  });

  expect(results.data.hierarchyProjects).toEqual([]);
});
