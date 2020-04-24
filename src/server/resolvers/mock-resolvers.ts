import { buildSchemaSync } from 'type-graphql';

import { TimingProjectMockResolvers } from './timing/mocks';

// 同时导出schema
export const finalMockSchema = buildSchemaSync({
  resolvers: [TimingProjectMockResolvers],
});
