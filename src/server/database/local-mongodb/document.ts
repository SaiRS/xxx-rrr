import { IRDocument } from './../interface-define';
import mongoose from 'mongoose';

export class MongoDocument implements IRDocument {
  doc: mongoose.Document;

  fromJSON(rawJSON: Record<string, any>): this {
    const keys = Object.keys(rawJSON);
    for (let key of keys) {
      this.set(key, rawJSON[key]);
    }
    return this;
  }

  constructor(doc: mongoose.Document, attributes?: Record<string, any>) {
    this.doc = doc;

    if (attributes) {
      this.fromJSON(attributes);
    }

    // eslint-disable-next-line compat/compat
    return new Proxy(this, {
      set(
        target: MongoDocument,
        key: string,
        value: any,
        receiver: any,
      ): boolean {
        // TODO: 暂且不做任何处理
        // 完成MongoDB数据存储实现之后再做修改
        // 希望能够做到
        // document.prop = 'ss'; // 将赋值转换为set('prop', 'ss);
        // eslint-disable-next-line compat/compat
        Reflect.set(target, key, value, receiver);

        // 严格模式下需要返回true
        return true;
      },
    });
  }

  get id(): string {
    return this.doc.id;
  }

  // 比较
  equals(doc: IRDocument): boolean {
    return !!this.id && this.id === doc.id;
  }

  // 查
  get(key: string): any {
    return this.doc.get(key);
  }
  toJSON(): Record<string, any> {
    return this.doc.toJSON();
  }

  /****************** 改 *****************/

  set(key: string, value: any): this {
    this.doc.set(key, value);
    return this;
  }

  // 更新
  async save(attr?: Record<string, any>): Promise<IRDocument> {
    if (attr) {
      this.fromJSON(attr);
    }
    return this.doc.save().then((newDoc: mongoose.Document) => {
      this.doc = newDoc;
      return this;
    });
  }

  // 删除
  async delete(): Promise<IRDocument> {
    return this.doc.remove().then((doc: mongoose.Document) => {
      this.doc = doc;
      return this;
    });
  }
}
