import { getTagsRequestUrl } from './utils';
import { xxxRequest, XXXResponse } from '@cvendors/requests';
import { ITag } from 'src/types';

/**
 * 删除tag标签请求
 * @export
 * @param {string[]} ids tag对应的id
 * @returns {(Promise<ITag | void>)} tag的信息
 */
export async function tagsDeleteRequest(id: string): Promise<ITag> {
  // if (ids.length > 0) {
  //   return await deleteManyTagRequest(ids);
  // } else {

  // }

  return await deleteOneTagRequest(id);
}

/**
 * 删除一个tag
 * @param {string} id tag对应的id
 * @returns {Promise<ITag>} tag的信息
 */
async function deleteOneTagRequest(id: string): Promise<ITag> {
  let url = getTagsRequestUrl(`tags/${id}`);

  let result: XXXResponse<ITag> = await xxxRequest.delete<ITag>(url);

  return result.data;
}

/**
 * 删除很多tag
 * @param {string[]} ids tags对应的id集合
 * @returns {Promise<void>} 无
 */
// async function deleteManyTagRequest(ids: string[]): Promise<void> {
//   let url = getTagsRequestUrl('tags');

//   await xxxRequest.delete<void>(url, {
//     data: {
//       ids: ids,
//     },
//   });

//   return;
// }
