import AV from 'leancloud-storage';
import { IRQuery, IRDocument } from '../interface-define';
import { getLeanCloudModel } from './model';

export class LeanCloudQuery implements IRQuery {
  query: AV.Query<AV.Queriable>;

  constructor(name: string) {
    this.query = new AV.Query(name);
  }

  toJSON(): Record<string, any> {
    return this.query.toJSON();
  }

  fromJSON(conditions?: Record<string, any>): this {
    if (conditions) {
      this.query = AV.Query.fromJSON(conditions);
    }

    return this;
  }

  // 比较
  equalTo(key: string, value: any): this {
    this.query.equalTo(key, value);
    return this;
  }
  notEqualTo(key: string, value: any): this {
    this.query.notEqualTo(key, value);
    return this;
  }
  greatThan(key: string, value: any): this {
    this.query.greaterThan(key, value);
    return this;
  }
  greatThanOrEqualTo(key: string, value: any): this {
    this.query.greaterThanOrEqualTo(key, value);
    return this;
  }
  lessThan(key: string, value: any): this {
    this.query.lessThan(key, value);
    return this;
  }
  lessThanOrEqualTo(key: string, value: any): this {
    this.query.lessThan(key, value);
    return this;
  }

  // 字符串
  startWith(key: string, prefix: string): this {
    this.query.startsWith(key, prefix);
    return this;
  }
  endsWith(key: string, suffix: string): this {
    this.query.endsWith(key, suffix);
    return this;
  }
  contains(key: string, substring: string): this {
    this.query.contains(key, substring);
    return this;
  }
  matches(key: string, regex: RegExp): this {
    this.query.matches(key, regex);
    return this;
  }

  // 数组
  containedIn(key: string, values: any[]): this {
    this.query.containedIn(key, values);
    return this;
  }
  notContainedIn(key: string, values: any[]): this {
    this.query.notContainedIn(key, values);
    return this;
  }

  // field
  exists(key: string): this {
    this.query.exists(key);
    return this;
  }
  notExist(key: string): this {
    this.query.doesNotExist(key);
    return this;
  }

  // 结果过滤,排序
  descending(key: string): this {
    this.query.descending(key);
    return this;
  }
  ascending(key: string): this {
    this.query.ascending(key);
    return this;
  }
  includes(keys: string[]): this {
    this.query.include(keys);
    return this;
  }
  limit(num: number): this {
    this.query.limit(num);
    return this;
  }
  skip(num: number): this {
    this.query.skip(num);
    return this;
  }

  async count(): Promise<number> {
    return this.query.count();
  }
  async find(): Promise<IRDocument[]> {
    return this.query.find().then((values: AV.Queriable[]) => {
      let docs: IRDocument[] = [];
      for (let value of values) {
        docs.push(
          getLeanCloudModel(this.query.className).createDocument(value),
        );
      }
      return docs;
    });
  }
  async findOne(): Promise<null | IRDocument> {
    return this.query.first().then((result: undefined | AV.Queriable) => {
      if (result) {
        return getLeanCloudModel(this.query.className).createDocument(result);
      } else {
        return null;
      }
    });
  }
  async delete(): Promise<void> {
    return this.query.destroyAll();
  }
  async deleteOne(): Promise<IRDocument> {
    return this.findOne().then((result: null | IRDocument) => {
      if (result) {
        // eslint-disable-next-line compat/compat
        return Promise.resolve(result);
      } else {
        // eslint-disable-next-line compat/compat
        return Promise.reject(result);
      }
    });
  }
  async update(criteria: any): Promise<void> {
    // eslint-disable-next-line compat/compat
    return Promise.resolve();
    // this.query.
  }

  async updateOne(criteria: any): Promise<IRDocument> {
    return this.findOne().then((result: null | IRDocument) => {
      if (result) {
        return result.save(criteria);
      } else {
        // eslint-disable-next-line compat/compat
        return Promise.reject(result);
      }
    });
  }

  and(...queries: LeanCloudQuery[]): this {
    this.query = AV.Query.and(this.query, ...queries.map((item) => item.query));
    return this;
  }

  or(...queries: LeanCloudQuery[]): this {
    this.query = AV.Query.or(this.query, ...queries.map((item) => item.query));
    return this;
  }
}
