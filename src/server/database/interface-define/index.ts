// 数据库
export type IRDataBaseInitCallbackFunc = (err?: Error) => void;

export interface ISchemaProps {
  definition: Record<string, any>;
  options?: Record<string, any>;
}

export interface IRDatabase {
  init(opt: Record<string, any>, callback?: IRDataBaseInitCallbackFunc): void;
  destory(): void;

  /**
   * 创建model
   * @param {string} name
   * @param {Object} protoProps
   * @param {Object} classProps
   * @returns {IRModel}
   * @memberof IRDatabase
   */
  getModel(
    name: string,
    protoProps?: Object,
    classProps?: Object,
    schemaProps?: ISchemaProps,
  ): IRModel;
}

// 数据表
export interface IRModel {
  /**************** document相关 ***********************/

  /**
   * 创建document
   * @returns {IRDocument}
   * @memberof IRModel
   */
  createDocument(attributes?: Record<string, any>): IRDocument;

  find(criteria?: any): Promise<IRDocument[]>;
  findById(id: string): Promise<null | IRDocument>;
  findOne(conditions?: any): Promise<null | IRDocument>;

  insertMany(docs: IRDocument[]): Promise<IRDocument[]>;

  deleteMany(conditions?: any): Promise<void>;
  deleteOne(conditions?: any): Promise<null | IRDocument>;

  updateOne(
    conditions?: any,
    updates?: Record<string, any>,
  ): Promise<IRDocument>;
  updateMany(conditions?: any, updates?: Record<string, any>): Promise<void>;

  /**************** query相关 ***********************/
  createQuery(): IRQuery;
}

// 数据记录
export interface IRDocument {
  /**************** 查 ***********************/

  // get id() {
  //   return this.get('id');
  // }

  // get<T = any>(key: string): T {
  //   throw new Error('子类需重载');
  // }
  id: string;

  equals(doc: IRDocument): boolean;

  // 查
  get<ValueT = any>(key: string): ValueT;
  toJSON(): Object;

  /**************** 改 ***********************/
  save(attr?: Record<string, any>): Promise<IRDocument>;
  set(key: string, value: any): this;

  /**************** 删 ***********************/
  delete(): Promise<IRDocument>;
}

// 查询
export interface IRQuery {
  toJSON(): Record<string, any>;
  fromJSON(conditions?: Record<string, any>): this;

  // 比较
  equalTo(key: string, value: any): this;
  notEqualTo(key: string, value: any): this;
  greatThanOrEqualTo(key: string, value: any): this;
  greatThan(key: string, value: any): this;
  lessThanOrEqualTo(key: string, value: any): this;
  lessThan(key: string, value: any): this;

  // 字符串
  startWith(key: string, prefix: string): this;
  endsWith(key: string, suffix: string): this;
  contains(key: string, substring: string): this;
  matches(key: string, regex: RegExp): this;

  // 数组
  notContainedIn(key: string, values: any[]): this;
  containedIn(key: string, values: any[]): this;

  // field
  exists(key: string): this;
  notExist(key: string): this;

  // 结果过滤，排序
  descending(key: string): this;
  ascending(key: string): this;
  includes(keys: string[]): this;
  limit(num: number): this;
  skip(num: number): this;

  // 查找
  count(): Promise<number>;
  find(criteria?: any): Promise<IRDocument[]>;
  findOne(criteria?: any): Promise<null | IRDocument>;
  delete(): Promise<void>;
  deleteOne(): Promise<IRDocument>;
  update(criteria: any): Promise<void>;
  updateOne(criteria: any): Promise<IRDocument>;

  // 逻辑查询
  and(...queries: this[]): this;
  or(...queries: this[]): this;
  not(...queries: this[]): this;

  // 查询结果的操作
  // count(): Promise<number>; // 获取数量
  // exec(): Promise<null | IRDocument | IRDocument[]>; // 只查找
  // remove(criteria?: any): Promise<null | IRDocument | IRDocument[]>; // 对查找的结果进行删除操作
  // update(criteria?: any): Promise<null | IRDocument | IRDocument[]>;
}
