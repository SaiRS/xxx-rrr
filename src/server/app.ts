import { SLogger } from '@sutils/logger';
import createError from 'http-errors';
import express, { NextFunction, Response, Request } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import addRequestId from 'express-request-id';
import { routers } from './routes';
import logger from 'morgan';

import { enableSwaggerDocServer } from './docs';

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
for (let config of routers) {
  app.use(config.path, config.router);
}

app.use('/', function(req, res) {
  res.send('hello');
});

// swagger docs
enableSwaggerDocServer(app);

// catch 404 and forward to error handler
app.use(function(req, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function errorMiddleware(
  err: { message: any; status: any },
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export { app };
