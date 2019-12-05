import { SLogger } from '@sutils/logger';
import mongoose from 'mongoose';
import Config from 'config';

mongoose
  .connect(
    `mongodb://${Config.get('Mongod.host')}:${Config.get(
      'Mongod.port',
    )}/${Config.get('Mongod.database')}`,
    {
      useNewUrlParser: true,
      autoIndex: false,
    },
  )
  .catch((reason: any) => {
    // 初始化连接错误
    SLogger.error(new Error(reason));
  });

// 禁用bufferCommands
mongoose.set('bufferCommands', false);

const db = mongoose.connection;

// 运行时错误
db.on('error', (err: Error) => {
  SLogger.error(err);
});

db.once('open', function() {
  // we're connected!
  console.log('mongo 连接成功');
});
