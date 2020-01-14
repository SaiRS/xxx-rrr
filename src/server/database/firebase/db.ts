import {
  IRDatabase,
  IRDataBaseInitCallbackFunc,
  IRModel,
} from '../interface-define';

import * as admin from 'firebase-admin';
import { getFirebaseModal } from './modal';

const serviceAccount = require('@root/xxxrrr-firebase-adminsdk-gr5kl-35d00d459f.json');

let db: IRDatabase;
export function getFirebase(): IRDatabase {
  if (!db) {
    db = {
      init: function initFirebase(
        opt: Record<string, any>,
        callback?: IRDataBaseInitCallbackFunc,
      ) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          // credential: admin.credential.applicationDefault(), // 需要设置环境变量
          databaseURL: 'https://xxxrrr.firebaseio.com',
        });

        if (typeof callback === 'function') {
          callback();
        }
      },
      destory() {},
      getModel(
        name: string,
        protoProps: Object = {},
        classProps: Object = {},
        schemaProps = { definition: {} },
      ): IRModel {
        // TODO: Firebase Modal
        // @ts-ignore
        return getFirebaseModal(name, protoProps, classProps, schemaProps);
      },
    };
  }

  return db;
}
