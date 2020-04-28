import { getTagsRequestUrl } from './utils';
import { rrrRequest } from '../base';
import { ITag } from 'src/types';
import { XXXResponse } from '@cvendors/requests';

interface ITagQueryPayload {
  page?: number;
  pageSize?: number;
}

/**
 * 查询tags
 * @export
 * @param {*} [{ page = 1, pageSize = 100 }={}]
 * @returns
 */
export async function tagsQueryRequest({
  page = 1,
  pageSize = 100,
}: ITagQueryPayload = {}): Promise<ITag[]> {
  let url = getTagsRequestUrl('tags');
  let result: XXXResponse<ITag[]> = await rrrRequest.get<ITag[]>(url, {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
  return result.data;
}
