import { IRDocument } from '../interface-define';

export class ComposedDocument implements IRDocument {
  docs: IRDocument[];
  constructor(docs: IRDocument[]) {
    this.docs = docs;
  }

  get id(): string {
    return this.docs[0].id || '';
  }

  equals(doc: IRDocument): boolean {
    return this.docs[0].equals(doc);
  }

  // 查
  get<ValueT = any>(key: string): ValueT {
    return this.docs[0].get(key);
  }

  toJSON(): Object {
    return this.docs[0].toJSON();
  }

  toJSONWithoutId(): Object {
    return this.docs[0].toJSONWithoutId();
  }

  save(attr?: Record<string, any>): Promise<IRDocument> {
    let allPromise = [];
    for (let i = 0; i < this.docs.length; i++) {
      allPromise.push(this.docs[i].save(attr));
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((result: IRDocument[]) => {
      return result[0];
    });
  }
  set(key: string, value: any): this {
    for (let i = 0; i < this.docs.length; i++) {
      this.docs[i].set(key, value);
    }

    return this;
  }

  delete(): Promise<IRDocument> {
    let allPromise = [];
    for (let i = 0; i < this.docs.length; i++) {
      allPromise.push(this.docs[i].delete());
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((result: IRDocument[]) => {
      return result[0];
    });
  }
}
