import { IRDatabase, IRModel } from '../interface-define';
import { getLeanCloundDB } from '../leancloud/db';

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
  return getLeanCloundDB();
}

export function getDBModel(name: string): IRModel {
  let db = getDBInstance();
  return db.getModel(name, {}, {}, {});
}
