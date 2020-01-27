import { IRQuery, ISchemaProps } from './../interface-define/index';
import { IRModel, IRDocument } from '../interface-define';
import mongoose from 'mongoose';
import { MongoDocument } from './document';
import { MongoQuery } from './query';
import { SLogger } from '@sutils/logger';

export function getMongoDBModel(
  name: string,
  protoProps: Object = {},
  classProps: Object = {},
  schemaProps: ISchemaProps = { definition: {} },
): MongoDBModel {
  return new MongoDBModel(name, protoProps, classProps, schemaProps);
}

/**
 * mongoDB的model类，是对mongoDB中的model的一层封装
 * 不直接使用，需要获取model时，请使用 getMongoDBModel
 *
 * TODO: 增加对virtual的支持
 * @class MongoDBModel
 * @extends {IRModel}
 */
class MongoDBModel implements IRModel {
  model: mongoose.Model<mongoose.Document>;
  schema: mongoose.Schema;

  /**
   *Creates an instance of MongoDBModel.
   * @param {string} name model的类名
   * @param {Record<string, any>} [protoProps={}] 实例属性，可以有函数，使用函数时，this指向MongoDBModel，不要使用箭头函数
   * @param {Record<string, any>} [classProps={}] 类属性，可以有函数，使用函数时，this指向MongoDBModel，其中带有query开头的函数会被放置在schema的query中， 不要使用箭头函数
   * @param {Record<string, any>} [schemaProps={}] schemaProps
   * @memberof MongoDBModel
   */
  constructor(
    name: string,
    protoProps: Record<string, any> = {},
    classProps: Record<string, any> = {},
    schemaProps: ISchemaProps = { definition: {} },
  ) {
    // 是否存在旧的modal
    if (mongoose.modelNames().includes(name)) {
      this.model = mongoose.models[name];
      this.schema = this.model.schema;
    } else {
      this.schema = new mongoose.Schema(
        schemaProps.definition,
        schemaProps.options,
      );

      // instance methods
      let protoPropKeys = Object.keys(protoProps);
      for (let key of protoPropKeys) {
        if (typeof protoProps[key] === 'function') {
          // 定义instance methods
          this.schema.method(key, protoProps[key]);
          // 或者另外一种写法
          // this.schema.methods[key] = protoProps[key];
        }
      }

      // class methods
      const classPropKeys = Object.keys(classProps);
      for (let key of classPropKeys) {
        if (typeof classProps[key] === 'function') {
          // 是不是query开始的
          if (key.match(/^query/)) {
            // 定义静态的query methods
            this.schema.query[key] = classProps[key];
            continue;
          }

          // TODO: hooks支持
          // if (key.match(/^hooks/)) {

          // }

          // 定义class methods
          this.schema.static(key, classProps[key]);
        }
      }

      this.model = mongoose.model(name, this.schema);
    }
  }

  /******************** 增 *************************/

  createDocument(attribues?: Record<string, any>): MongoDocument {
    let doc: mongoose.Document = new this.model();
    return new MongoDocument(doc, attribues);
  }

  createQuery(): IRQuery {
    // let query = new mongoose.Query();
    let query = this.model.find();
    return new MongoQuery(query);
  }

  /******************** 查 *************************/

  find(criteria?: any): Promise<IRDocument[]> {
    let query = this.createQuery();
    return query.find(criteria);
  }

  findById(id: string): Promise<null | IRDocument> {
    let query = this.createQuery();
    return query.equalTo('_id', id).findOne();
  }

  findOne<T = any>(conditions?: any): Promise<null | IRDocument> {
    let query = this.createQuery();
    return query.findOne(conditions);
  }

  async deleteMany(conditions?: any): Promise<void> {
    return this.model.deleteMany(conditions).then(() => {
      return;
    });
  }

  async deleteOne(conditions?: any): Promise<IRDocument | null> {
    let doc: IRDocument | null = await this.findOne(conditions);
    await this.model.deleteOne(conditions);
    return doc;
    // return this.findOne(conditions).then((doc: IRDocument | null) => {
    //   if (doc) {
    //     return doc.delete();
    //   } else {
    //     // eslint-disable-next-line compat/compat
    //     return Promise.reject(new Error('没有找到该对象'));
    //   }
    // });
  }

  async insertMany(docs: IRDocument[]): Promise<IRDocument[]> {
    let resultDocs = docs.map((doc) => doc.toJSON());
    let newDocs: mongoose.Document[] = await this.model.insertMany(resultDocs);
    return newDocs.map((nDoc) => this.createDocument(nDoc.toJSON()));
  }

  async updateOne(
    conditions?: any,
    updates?: Record<string, any>,
  ): Promise<IRDocument> {
    let query = this.createQuery();
    return query.findOne(conditions).then((doc: IRDocument | null) => {
      if (doc) {
        let normalizedUpdates = updates ? updates : {};
        for (let key of Object.keys(normalizedUpdates)) {
          // doc
          doc.set(key, normalizedUpdates[key]);
        }

        return doc.save();
      } else {
        // eslint-disable-next-line compat/compat
        return Promise.reject(new Error('没有找到该对象'));
      }
    });
  }

  async updateMany(
    conditions?: any,
    updates?: Record<string, any>,
  ): Promise<void> {
    return this.model.updateMany(conditions, updates).then(() => {
      return;
    });
  }
}
