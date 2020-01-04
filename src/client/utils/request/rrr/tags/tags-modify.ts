import { getTagsRequestUrl } from './utils';
import { ITag } from 'src/types';
import { xxxRequest, XXXResponse } from '@cvendors/requests';

/**
 * 更新tag的信息
 * @export
 * @param {string} id tag对应的id
 * @param {Partial<Omit<ITag, 'id'>>} [payload={}] 新的属性
 * @returns {Promise<ITag>} tag的信息
 */
export async function tagsModifyRequest(
  id: string,
  payload: Partial<Omit<ITag, 'id'>> = {},
): Promise<ITag> {
  let url = getTagsRequestUrl(`tags/${id}`);

  let result: XXXResponse<ITag> = await xxxRequest.put<ITag>(url, payload);
  return result.data;
}
