import { IRQuery, IRDocument } from '../interface-define';

// TODO: ComposedQuery
// @ts-ignore
export class ComposedQuery implements IRQuery {
  queries: IRQuery[];
  constructor(queries: IRQuery[]) {
    this.queries = queries;
  }

  toJSON(): Record<string, any> {
    let json = {};
    for (let i = 0; i < this.queries.length; i++) {
      json = this.queries[i].toJSON();
    }
    return json;
  }
  fromJSON(conditions?: Record<string, any>): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].fromJSON(conditions);
    }
    return this;
  }

  // 比较
  equalTo(key: string, value: any): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].equalTo(key, value);
    }
    return this;
  }
  notEqualTo(key: string, value: any): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].notEqualTo(key, value);
    }
    return this;
  }
  greatThanOrEqualTo(key: string, value: any): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].greatThanOrEqualTo(key, value);
    }
    return this;
  }
  greatThan(key: string, value: any): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].greatThan(key, value);
    }
    return this;
  }
  lessThanOrEqualTo(key: string, value: any): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].lessThanOrEqualTo(key, value);
    }
    return this;
  }
  lessThan(key: string, value: any): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].lessThan(key, value);
    }
    return this;
  }

  // 字符串
  startWith(key: string, prefix: string): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].startWith(key, prefix);
    }
    return this;
  }
  endsWith(key: string, suffix: string): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].endsWith(key, suffix);
    }
    return this;
  }
  contains(key: string, substring: string): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].contains(key, substring);
    }
    return this;
  }
  matches(key: string, regex: RegExp): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].matches(key, regex);
    }
    return this;
  }

  // 数组
  notContainedIn(key: string, values: any[]): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].notContainedIn(key, values);
    }
    return this;
  }
  containedIn(key: string, values: any[]): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].containedIn(key, values);
    }
    return this;
  }

  // field
  exists(key: string): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].exists(key);
    }
    return this;
  }
  notExist(key: string): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].notExist(key);
    }
    return this;
  }

  // 结果过滤，排序
  descending(key: string): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].descending(key);
    }
    return this;
  }
  ascending(key: string): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].ascending(key);
    }
    return this;
  }
  includes(keys: string[]): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].includes(keys);
    }
    return this;
  }
  limit(num: number): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].limit(num);
    }
    return this;
  }
  skip(num: number): this {
    for (let i = 0; i < this.queries.length; i++) {
      this.queries[i].skip(num);
    }
    return this;
  }

  // 查找
  count(): Promise<number> {
    // eslint-disable-next-line compat/compat
    let allPromise = [];
    for (let i = 0; i < this.queries.length; i++) {
      allPromise.push(this.queries[i].count());
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((counts: number[]) => {
      return counts[0];
    });
  }
  async find(criteria?: any): Promise<IRDocument[]> {
    // eslint-disable-next-line compat/compat
    let allPromise = [];
    for (let i = 0; i < this.queries.length; i++) {
      allPromise.push(this.queries[i].find(criteria));
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((results: IRDocument[][]) => {
      return results[0];
    });
  }
  async findOne(criteria?: any): Promise<null | IRDocument> {
    // eslint-disable-next-line compat/compat
    let allPromise = [];
    for (let i = 0; i < this.queries.length; i++) {
      allPromise.push(this.queries[i].findOne(criteria));
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((results: Array<IRDocument | null>) => {
      return results[0];
    });
  }
  async delete(): Promise<void> {
    // eslint-disable-next-line compat/compat
    let allPromise = [];
    for (let i = 0; i < this.queries.length; i++) {
      allPromise.push(this.queries[i].delete());
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((results: void[]) => {
      return results[0];
    });
  }
  async deleteOne(): Promise<IRDocument> {
    // eslint-disable-next-line compat/compat
    let allPromise = [];
    for (let i = 0; i < this.queries.length; i++) {
      allPromise.push(this.queries[i].deleteOne());
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((results: IRDocument[]) => {
      return results[0];
    });
  }
  async update(criteria: any): Promise<void> {
    // eslint-disable-next-line compat/compat
    let allPromise = [];
    for (let i = 0; i < this.queries.length; i++) {
      allPromise.push(this.queries[i].update(criteria));
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((results: void[]) => {
      return results[0];
    });
  }
  async updateOne(criteria: any): Promise<IRDocument> {
    // eslint-disable-next-line compat/compat
    let allPromise = [];
    for (let i = 0; i < this.queries.length; i++) {
      allPromise.push(this.queries[i].updateOne(criteria));
    }

    // eslint-disable-next-line compat/compat
    return Promise.all(allPromise).then((results: IRDocument[]) => {
      return results[0];
    });
  }

  // 逻辑查询
  and(...queries: this[]): this {
    for (let i = 0; i < this.queries.length; i++) {
      // TODO: 对queries 分类
      // this.queries[i].and(queries);
    }
    return this;
  }
  or(...queries: this[]): this {
    for (let i = 0; i < this.queries.length; i++) {
      // TODO: 对queries 分类
      // this.queries[i].or(queries);
    }
    return this;
  }
}
