import AV from 'leancloud-storage';
import { IRDocument } from '../interface-define';

/**
 * 创建lean cloud的document
 * 适配器模式
 * @export
 * @param {typeof AV.Object} Model
 * @returns {LeanCloudDocument}
 */
export function createLeanCloudDocument(
  Model: typeof AV.Object,
  attributes?: Object,
): LeanCloudDocument {
  return new LeanCloudDocument(Model, attributes);
}

export class LeanCloudDocument implements IRDocument {
  doc: AV.Object;
  model: typeof AV.Object;

  constructor(Model: typeof AV.Object, attributes?: Record<string, any>) {
    this.model = Model;
    // @ts-ignore
    this.doc = new this.model(attributes);
  }

  /****************** 查询 ****************/
  // id，如果实例上有id(会被覆盖)，则以这个为准
  get id(): string | undefined {
    return this.doc.id;
  }

  get<ValueT = any>(attr: string): ValueT {
    return this.doc.get(attr) as ValueT;
  }

  /****************** 修改 ****************/

  set(key: string, value: any): this {
    this.doc.set(key, value);
    return this;
  }

  async save(attr?: Record<string, any>): Promise<IRDocument> {
    return this.doc.save(attr).then((result: AV.Object) => {
      this.doc = result;
      return this;
    });
  }

  /****************** 删除 ****************/

  async delete(): Promise<IRDocument> {
    return this.doc.destroy().then((result: AV.Object) => {
      this.doc = result;
      return this;
    });
  }

  /****************** 辅助方法 ****************/

  toJSON(): Object {
    return this.doc.toFullJSON();
  }

  // 比较
  equals(doc: IRDocument): boolean {
    return !!this.id && this.id === doc.id;
  }
}
