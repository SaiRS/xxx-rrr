import uuid from 'uuid';
import { Error as JSONAPIError, SerializerOptions } from 'jsonapi-serializer';

/**
 * error的序列化
 * @export
 * @param {Error} error error对象
 * @param {IErrorSerializeOption} [opt={}] 选项
 * @returns
 */
export function errorSerializer(error: Error, opt: SerializerOptions = {}) {
  return new JSONAPIError({
    id: uuid(),
    status: '',
    code: '',
    title: error.message,
    detail: error.message,
    source: {
      pointer: '',
      parameter: '',
    },
    links: {
      about: '',
    },
    meta: {},
  });
}
