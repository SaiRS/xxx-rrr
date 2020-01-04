import { getTagsRequestUrl } from './utils';
import { rrrRequest } from '../base';
import { XXXResponse } from '@cvendors/requests';
import { ITag } from 'src/types';

/**
 * 新增一个标签
 * @export
 * @param {Omit<ITag, 'id'>} payload 请求的payload
 * @returns {ITag} 新增的标签
 */
export async function tagsAddRequest(payload: Omit<ITag, 'id'>): Promise<ITag> {
  let url = getTagsRequestUrl('tags');
  let result: XXXResponse<ITag> = await rrrRequest.post<ITag>(url, payload);

  return result.data;
}
