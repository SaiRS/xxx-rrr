import { IRDatabase, IRModel } from '../interface-define';
import { getMongoDB } from '../local-mongodb/db';

/**
 * 获取database的实例
 * @example
 *   let db = getDBInstance();
 *   let model = db.getModel('model-name');
 *   let newDoc = model.createDocument();
 *   let query = model.find();
 *   let query = model.createQuery();
 *   query.then(() => {});
 * @export
 */
export function getDBInstance(): IRDatabase {
  return getMongoDB();
}

export function getDBModel(name: string): IRModel {
  let db = getDBInstance();
  return db.getModel(name, {}, {}, { definition: {} });
}

// 业务层使用的
export function getTagsModal(): IRModel {
  return getDBModel('tags');
}
