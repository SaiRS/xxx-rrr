import { getTagsRequestUrl } from './utils';
import { rrrRequest } from '../base';

export async function tagsQueryRequest({ page = 1, pageSize = 100 } = {}) {
  let url = getTagsRequestUrl('tags');
  let result = await rrrRequest.get(url, {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
  return result;
}
