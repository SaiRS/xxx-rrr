// import { getRequestVersionPath } from '../../utils';
// import { rrrRequest } from '../../base';
import { IFTimingProject } from 'src/types';
import { apolloClient } from '../../apollo-client';
import gql from 'graphql-tag';

/**
 * 按层级关系获取timing中的projects
 * @export
 * @returns {Promise<IFTimingProject[]>} 层级关系的projects
 */
export async function getHierarchyProjects(): Promise<IFTimingProject[]> {
  let results = await apolloClient.query<IFTimingProject[]>({
    query: gql`
      query Demo {
        # resolver root
        hierarchyProjects {
          title
        }
      }
    `,
  });

  return results.data;
}
