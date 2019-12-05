import pino from 'pino';

const _logger = pino({
  prettyPrint: true,
});

// S for Server
export const SLogger = {
  info: _logger.info,
  warn: _logger.warn,
  error: _logger.error,
};
