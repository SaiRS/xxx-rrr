import bunyan from 'bunyan';
import { NextFunction, Request, Response } from 'express';

const _logger = bunyan.createLogger({
  level: process.env.NODE_ENV === 'production' ? bunyan.WARN : bunyan.DEBUG,
  name: 'rrr-server',
  src: true,
  streams: [
    {
      name: 'normal',
      level: 'info',
      type: 'stream',
      stream: process.stdout,
    },
    {
      name: 'error',
      level: 'error',
      type: 'file',
      path: './rrr-server-error.log',
    },
  ],
});

// S for Server,
export const SLogger = {
  debug: _logger.debug.bind(_logger),
  info: _logger.info.bind(_logger),
  warn: _logger.warn.bind(_logger),
  error: _logger.error.bind(_logger),
  fatal: _logger.fatal.bind(_logger),
};

export function loggerRequestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  var log = _logger.child(
    {
      // @ts-ignore
      id: req.id,
      body: req.body,
    },
    true,
  );
  log.info({ req: req });
  next();
}

export function loggerResponseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  function afterResponse() {
    res.removeListener('finish', afterResponse);
    res.removeListener('close', afterResponse);
    var log = _logger.child(
      {
        // @ts-ignore
        id: req.id,
      },
      true,
    );
    log.info({ res: res }, 'response');
  }
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
}
