// jsdoc的配置文件

module.exports = {
  opts: {
    template: 'node_modules/better-docs',
    encoding: 'utf8', // same as -e utf8
    destination: './api-docs/', // same as -d ./api-docs/
    recurse: true, // same as -r
  },
  tags: {
    allowUnknownTags: true, //or true
  },
  plugins: ['node_modules/better-docs/typescript'],
  source: {
    include: ['src'], // 把jsdoc的错误修改完就能正确生成文档了
    includePattern: '\\.(jsx|js|ts|tsx)$',
    excludePattern: 'www.ts',
  },
};
