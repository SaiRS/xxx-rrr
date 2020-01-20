import {
  IRModel,
  IRDataBaseInitCallbackFunc,
  ISchemaProps,
} from './../interface-define/index';
import { IRDatabase } from '../interface-define';

import { SLogger } from '@sutils/logger';
import mongoose from 'mongoose';
import Config from 'config';
import { getMongoDBModel } from './model';
import { TagSchemaDefinition } from './models';
import { TestSchemaDefinition } from './models/test-modal';

function defineDefaultModals() {
  // 如果是测试环境
  if (process.env.NODE_ENV === 'test') {
    getMongoDBModel('test-modal', {}, {}, { definition: TestSchemaDefinition });
  }
  // tags
  getMongoDBModel(
    'tags',
    {},
    {},
    {
      definition: TagSchemaDefinition,
    },
  );
}

export function getMongoDB(): IRDatabase {
  let isInited: boolean = false;
  let isIniting: boolean = false;

  return {
    init: function initMongoDB(
      opt: {
        host?: string;
        port?: string;
        database?: string;
      } = {
        host: Config.get('Mongod.host'),
        port: Config.get('Mongod.port'),
        database: Config.get('Mongod.database'),
      },
      callback?: IRDataBaseInitCallbackFunc,
    ) {
      if (isInited || isIniting) {
        return;
      }

      isIniting = true;
      SLogger.debug(
        `mongodb的连接参数 host=${opt.host}, port=${opt.port}, database=${opt.database}`,
      );
      mongoose
        .connect(`mongodb://${opt.host}:${opt.port}/${opt.database}`, {
          useNewUrlParser: true,
          autoIndex: false,
          useUnifiedTopology: true,
          keepAlive: true,
          useFindAndModify: false, // findAndUpdateOne需要
        })
        .catch((reason: any) => {
          // 初始化连接错误
          SLogger.error(new Error(reason));
          isIniting = false;

          if (typeof callback === 'function') {
            callback(new Error(reason));
          }
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
        SLogger.info(`mongo 连接${opt.database}成功`);

        // 注册一些默认的modal
        defineDefaultModals();

        if (typeof callback === 'function') {
          callback(undefined);
        }
      });
    },

    destory: function destoryMongoDB() {
      mongoose.disconnect();
    },

    getModel(
      name: string,
      protoProps: Object = {},
      classProps: Object = {},
      schemaProps: ISchemaProps = { definition: {} },
    ): IRModel {
      return getMongoDBModel(name, protoProps, classProps, schemaProps);
    },
  };
}
