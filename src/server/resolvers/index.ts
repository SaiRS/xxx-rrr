import { buildSchemaSync } from 'type-graphql';

import { TimingProjectResolvers } from './timing';

// 同时导出schema
export const finalSchema = buildSchemaSync({
  resolvers: [TimingProjectResolvers],
});
