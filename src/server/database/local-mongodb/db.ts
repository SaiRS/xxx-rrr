import { IRModel } from './../interface-define/index';
import { IRDatabase } from '../interface-define';

import { SLogger } from '@sutils/logger';
import mongoose from 'mongoose';
import Config from 'config';
import { getMongoDBModel } from './model';

export function getMongoDB(): IRDatabase {
  let isInited: boolean = false;
  let isIniting: boolean = false;

  return {
    init: function initMongoDB() {
      if (isInited || isIniting) {
        return;
      }

      isIniting = true;

      mongoose
        .connect(
          `mongodb://${Config.get('Mongod.host')}:${Config.get(
            'Mongod.port',
          )}/${Config.get('Mongod.database')}`,
          {
            useNewUrlParser: true,
            autoIndex: false,
            useUnifiedTopology: true,
            keepAlive: true,
          },
        )
        .catch((reason: any) => {
          // 初始化连接错误
          SLogger.error(new Error(reason));
          isIniting = false;
        });

      // 禁用bufferCommands
      mongoose.set('bufferCommands', false);

      const db = mongoose.connection;

      // 运行时错误
      db.on('error', (err: Error) => {
        SLogger.error(err);
      });

      db.once('open', function() {
        isInited = true;
        isIniting = true;
        // we're connected!
        SLogger.info('mongo 连接成功');
      });
    },

    destory: function destoryMongoDB() {
      mongoose.disconnect();
    },

    getModel(name: string, protoProps: Object, classProps: Object): IRModel {
      return getMongoDBModel(name, protoProps, classProps);
    },
  };
}
