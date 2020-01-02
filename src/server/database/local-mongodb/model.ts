import { IRQuery } from './../interface-define/index';
import { IRModel, IRDocument } from '../interface-define';
import mongoose from 'mongoose';
import { MongoDocument } from './document';
import { MongoQuery } from './query';

let existModels: Record<string, MongoDBModel> = {};
export function getMongoDBModel(
  name: string,
  protoProps: Object,
  classProps: Object,
): MongoDBModel {
  let model = existModels[name];

  if (!model) {
    model = new MongoDBModel(name, protoProps, classProps);
    existModels[name] = model;
  }

  return model;
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
   * @memberof MongoDBModel
   */
  constructor(
    name: string,
    protoProps: Record<string, any> = {},
    classProps: Record<string, any> = {},
  ) {
    this.schema = new mongoose.Schema();

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

  /******************** 增 *************************/

  createDocument(attribues?: Record<string, any>): MongoDocument {
    let doc = new this.model();
    return new MongoDocument(doc, attribues);
  }

  createQuery(): IRQuery {
    let query = new mongoose.Query();
    return new MongoQuery(query);
  }

  /******************** 查 *************************/

  find(criteria?: any): Promise<IRDocument[]> {
    let query = this.createQuery();
    return query.find(criteria);
  }

  findById(id: string): Promise<null | IRDocument> {
    let query = this.createQuery();
    return query.equalTo('id', id).findOne();
  }

  findOne<T = any>(conditions?: any): Promise<null | IRDocument> {
    let query = this.createQuery();
    return query.findOne(conditions);
  }
}
