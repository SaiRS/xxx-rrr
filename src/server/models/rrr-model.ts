import { Serializer } from 'jsonapi-serializer';

export class RRRModel {
  serialize(serializer: Serializer) {
    throw new Error('继承RRRModel的子类需实现serialize方法');
  }

  static deserialize(jsonObj: Record<string, any>) {
    throw new Error('');
  }
}
