import debug from 'debug';

const error = debug('app:error');

export const Logger = {
  log: debug('app:log'),
  warn: debug('app:warning'),
  error: function errorLog(...args: any) {
    console.error(...args);
    error('', ...args);
  },
};
