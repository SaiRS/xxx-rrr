import AV from 'leancloud-storage';
import { createLeanCloudDocument, LeanCloudDocument } from './document';
import { IRModel, IRQuery, IRDocument } from '../interface-define';
import { LeanCloudQuery } from './query';

let existedModels: Record<string, IRModel> = {};

/**
 * 获取LeanCloud Model
 * 如果name对应的model之前有创建过，则直接返回之前创建的Model，此时protoProps，classProps不会生效
 * 如果没有，则新建一个Model对象并返回
 * @export
 * @param {string} name
 * @param {Object} [protoProps={}]
 * @param {Object} [classProps={}]
 * @returns {IRModel}
 */
export function getLeanCloudModel(
  name: string,
  protoProps: Object = {},
  classProps: Object = {},
): IRModel {
  if (existedModels[name]) {
    return existedModels[name];
  }

  existedModels[name] = new LeanCloudModel(name, protoProps, classProps);

  return existedModels[name];
}

/**
 * 创建lean cloud的数据模型, 内部使用
 * 一般而言，不需要直接使用这个方法，而是采用getModelIdNeeded代替。
 * @export
 * @param {string} name
 * @param {Object} [protoProps={}]
 * @param {Object} [classProps={}]
 * @returns {IRModel}
 */
// function createLeanCloudModel(
//   name: string,
//   protoProps: Object = {},
//   classProps: Object = {},
// ): IRModel {
//   let model = AV.Object.extend(name, protoProps, classProps);

//   return {
//     createDocument: function createLeanCloudDocument(): IRDocument {
//       return createLeanCloudDocument(model);
//     },
//     createQuery: function createLeanCloudQuery(): IRQuery {
//       let query = AV.Query(name);

//       return {

//       }
//     },
//   };
// }

export class LeanCloudModel implements IRModel {
  model: typeof AV.Object;

  constructor(name: string, protoProps: Object = {}, classProps: Object = {}) {
    this.model = AV.Object.extend(name, protoProps, classProps);
  }

  createDocument(attributes?: Record<string, any>): IRDocument {
    return createLeanCloudDocument(this.model, attributes);
  }

  createQuery(): IRQuery {
    return new LeanCloudQuery(this.model.name);
  }

  async find(): Promise<IRDocument[]> {
    let query = this.createQuery();
    return query.find();
  }

  async findById(id: string): Promise<null | IRDocument> {
    let query = this.createQuery();
    return query.equalTo('id', id).findOne();
  }

  async findOne(): Promise<null | IRDocument> {
    let query = this.createQuery();
    return query.findOne();
  }
}
