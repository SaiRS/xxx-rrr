import { IRQuery, IRDocument } from '../interface-define';
import mongoose from 'mongoose';
import { MongoDocument } from './document';

export class MongoQuery<T = any> implements IRQuery {
  query: mongoose.DocumentQuery<T, mongoose.Document>;

  constructor(query: mongoose.Query<T>) {
    this.query = query;
  }

  toJSON() {
    return this.query.getQuery();
  }

  fromJSON(conditions?: Record<string, any>) {
    this.query.setQuery(conditions);
    return this;
  }

  // 比较
  equalTo(key: string, value: any): this {
    this.query.where(key, value);
    return this;
  }
  notEqualTo(key: string, value: any): this {
    this.query.ne(key, value);
    return this;
  }
  greatThanOrEqualTo(key: string, value: any): this {
    this.query.gte(key, value);
    return this;
  }
  greatThan(key: string, value: any): this {
    this.query.gt(key, value);
    return this;
  }
  lessThanOrEqualTo(key: string, value: any): this {
    this.query.lte(key, value);
    return this;
  }
  lessThan(key: string, value: any): this {
    this.query.lt(key, value);
    return this;
  }

  // 字符串
  startWith(key: string, prefix: string): this {
    this.query.where(key, new RegExp(`^${prefix}`));
    return this;
  }
  endsWith(key: string, suffix: string): this {
    this.query.where(key, new RegExp(`${suffix}$`));
    return this;
  }
  contains(key: string, substring: string): this {
    this.query.where(key, new RegExp(substring));
    return this;
  }
  matches(key: string, regex: RegExp): this {
    this.query.where(key, regex);
    return this;
  }

  // 数组
  notContainedIn(key: string, values: any[]): this {
    this.query.nin(key, values);
    return this;
  }
  containedIn(key: string, values: any[]): this {
    this.query.in(key, values);
    return this;
  }

  // field
  exists(key: string): this {
    this.query.exists(key, true);
    return this;
  }
  notExist(key: string): this {
    this.query.exists(key, false);
    return this;
  }

  // 结果过滤，排序
  descending(key: string): this {
    this.query.sort({ [key]: -1 });
    return this;
  }
  ascending(key: string): this {
    this.query.sort({ [key]: 1 });
    return this;
  }
  includes(keys: string[]): this {
    this.query.select(keys.join(' '));
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

  // 查找
  async find(criteria?: any): Promise<IRDocument[]> {
    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      this.query.find(criteria, (error, res: mongoose.Document[]) => {
        if (!error) {
          let results: MongoDocument[] = [];
          for (let value of res) {
            results.push(new MongoDocument(value));
          }
          resolve(results);
        } else {
          reject(error);
        }
      });
    });
  }

  async findOne(criteria?: any): Promise<IRDocument | null> {
    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      this.query.findOne(criteria, (error, res: mongoose.Document | null) => {
        if (!error) {
          if (res) {
            resolve(new MongoDocument(res));
          } else {
            resolve(null);
          }
        } else {
          reject(error);
        }
      });
    });
  }

  async count(): Promise<number> {
    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      this.query.countDocuments((err: Error, value: number) => {
        if (!err) {
          resolve(value);
        } else {
          reject(err);
        }
      });
    });
  }

  delete(): Promise<void> {
    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      // NOTE: @types没有提供?
      // @ts-ignore
      this.query.deleteMany((err: Error) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  deleteOne(): Promise<IRDocument> {
    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      this.query.findOneAndRemove((err: Error, doc: mongoose.Document) => {
        if (!err) {
          resolve(new MongoDocument(doc));
        } else {
          reject(err);
        }
      });
    });
  }

  update(criteria: any): Promise<void> {
    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      this.query.update((err: Error) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  updateOne(criteria: any): Promise<IRDocument> {
    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      this.query.findOneAndUpdate((err: Error, doc: mongoose.Document) => {
        if (!err) {
          resolve(new MongoDocument(doc));
        } else {
          reject(err);
        }
      });
    });
  }

  // 逻辑运算
  and(...queries: MongoQuery[]): this {
    let orQueries = queries.map((qur) => qur.query.getQuery());
    let queryJson = this.query.getQuery();

    // 重置一次
    this.query.setQuery({});
    this.query = this.query.and([queryJson, ...orQueries]);
    return this;
  }

  or(...queries: MongoQuery[]): this {
    let orQueries = queries.map((qur) => qur.query.getQuery());
    let queryJson = this.query.getQuery();

    // 重置一次
    this.query.setQuery({});
    this.query = this.query.or([queryJson, ...orQueries]);

    return this;
  }
  not(): this {
    let queryJson = this.query.getQuery();

    // 重置一次
    this.query.setQuery({});
    this.query = this.query.nor([queryJson]);
    return this;
  }
}
