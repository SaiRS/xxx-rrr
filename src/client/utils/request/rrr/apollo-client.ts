import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  // TODO: 根据配置去修改apollo server uri
  uri: 'http://localhost:8686/graphql',
});

export const apolloClient: ApolloClient<
  NormalizedCacheObject
> = new ApolloClient({
  cache,
  link,
});
