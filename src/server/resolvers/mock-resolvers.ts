import { buildSchemaSync } from 'type-graphql';

import { TimingProjectResolvers } from './timing/mock';

// 同时导出schema
export const finalMockSchema = buildSchemaSync({
  resolvers: [TimingProjectResolvers],
});
