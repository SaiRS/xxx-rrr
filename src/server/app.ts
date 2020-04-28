import createError from 'http-errors';
import express, { NextFunction, Response, Request } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import addRequestId from 'express-request-id';
import logger from 'morgan';

import { SLogger } from '@sutils/logger';

import { enableSwaggerDocServer } from './docs';
import { errorSerializer } from '@sutils/serializer';
// import { getDBInstance } from './database/db-factory';

import graphqlHTTP from 'express-graphql';
import { finalSchema } from './resolvers';

const app: express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(addRequestId());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use(cors());

// 加载route
// for (let config of routers) {
//   app.use(config.path, config.router);
// }

app.use(
  '/graphql',
  graphqlHTTP({
    schema: finalSchema,
    graphiql: process.env.NODE_ENV !== 'production',
  }),
);

app.use('/', function(req, res) {
  res.send('慢慢游的奇幻世界');
});

// 数据库初始化(第一版先不做)
// getDBInstance().init();

// swagger docs
enableSwaggerDocServer(app);

// catch 404 and forward to error handler
app.use(function(req, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  let error = errorSerializer(err);
  SLogger.error(err, error);

  // render the error page
  // @ts-ignore
  res.status(err.code || 500);
  res.json(error);
});
export { app };