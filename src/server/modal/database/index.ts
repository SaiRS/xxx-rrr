import mongoose from 'mongoose';
import Config from 'config';

mongoose.connect(
  `mongodb://${Config.get('Mongod.host')}:${Config.get('Mongod.port')}`,
  {
    useNewUrlParser: true,
  },
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

db.once('open', function() {
  // we're connected!
  console.log('mongo 连接成功');
});
