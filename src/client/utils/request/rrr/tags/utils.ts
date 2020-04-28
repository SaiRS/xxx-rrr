import { getRequestVersionPath } from '../utils';

// 请求接口的地址

export function getTagsRequestUrl(path: string): string {
  return getRequestVersionPath(`${path}`);
}
