import { getTagsRequestUrl } from './utils';
import { rrrRequest } from '../base';
import { ITag } from '@server/database';

export async function tagsAddRequest(payload: Omit<ITag, 'id'>) {
  let url = getTagsRequestUrl('tags');
  let result = await rrrRequest.post(url, {
    params: payload,
  });
  return result;
}
