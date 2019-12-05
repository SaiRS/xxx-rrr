import debug from 'debug';

const error = debug('app:error');

// C for Client
export const CLogger = {
  info: debug('app:log'),
  warn: debug('app:warning'),
  error: function errorLog(...args: any) {
    console.error(...args);
    error('', ...args);
  },
};
