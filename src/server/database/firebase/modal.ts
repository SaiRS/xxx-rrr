import { IRModel, IRDocument } from '../interface-define';

import * as admin from 'firebase-admin';

export function getFirebaseModal(
  name: string,
  protoProps: Object = {},
  classProps: Object = {},
  schemaProps = { definition: {} },
): FirebaseModal {
  let db = admin.database();
  return new FirebaseModal(name, db);
}

// TODO: FirebaseModal
// @ts-ignore
export class FirebaseModal implements IRModel {
  modal: admin.database.Reference;

  constructor(name: string, database: admin.database.Database) {
    let prefix = 'server/rrr';
    let ref = database.ref(`${prefix}`);

    this.modal = ref.child(name);

    // 监听事件
    this.modal.on('child_added', () => {});
  }

  async insertMany(docs: IRDocument[]): Promise<IRDocument[]> {
    let modalKey = this.modal.key;

    let updates: { [key: string]: Record<string, any> } = {};

    for (let doc of docs) {
      let key = this.modal.push().key;
      updates[`/${modalKey}/${key}`] = doc.toJSONWithoutId();
    }

    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      this.modal.update(updates, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          // 重新构建新的docs
          resolve();
        }
      });
    });
  }
}
