1. 运行 ts-node 使用，需要将 tsconfig.json 中的 module 改成 commonJs,不然运行会出错（因为 ts-node 只认识 CommonJS)
2. 使用 tailwind，用作底层的 css 框架（非 UI 框架)
3. 为了减少 css 文件的大小，使用了 purgecss（移除不使用的 css)
4. 扩展模块的定义

```
import { Request } from 'express'; // 引入原先模块
// 扩展
declare module 'express' {
interface Request {
  id: string;
}
}
```

5. type-graphl 是 node 模块，在 client 中使用不了，因为我们的 schema，type 又必须在 web 端用到它，怎么办

   ```
    webpack plugin 添加
    ![参考文档](https://github.com/MichalLytek/type-graphql/blob/master/docs/browser-usage.md)

        new webpack.NormalModuleReplacementPlugin(/type-graphql$/, resource => {
      resource.request = resource.request.replace(/type-graphql/, "type-graphql/dist/browser-shim.js");
    }),
   ```

6. 在测试 graphl 中遇到的问题

   1. 我们利用 jest 的 globalSetup 来启动一个测试服务器，本来想着引用一些已经定义好的模块，像`import { finalSchema } from '@server/resolvers';`，但是死活报`找不到模块@server/resolvers`, 改用相对路径就行，但问题是相对路径引用的模块依然包含着`别名的导入`，解决办法

   ```
    修改前
     "test:server": "cross-env DEBUG=app:* node scripts/test.js src/server/resolvers/ --env='node'",

    修改后
     "test:server": "cross-env DEBUG=app:* node -r tsconfig-paths/register scripts/test.js src/server/resolvers/ --env='node'",

     增加了 -r tsconfig-paths/register
   ```

   1. globalTeardown 用来关闭测试服务器，但是在具体的测试用例当中，获取不了 global 中的值，所以对于客户端我们是在每个用例中单独创建
   2. jest 的 mock 只能 mock default 导出，事实

   ```
     jest.mock('@server/requests');时会爆

     Cannot read property 'default' of undefined

     此时@server/requests都是命名导出
   ```

   3. jest 中 mock 自定义模块，可以采用**mocks**/\*\*\*\*文件的方法，也可以在导入之后使用 mock function 的形式，但只能选一种，不然会有差

      ```
      import getHierarchyProjectsRequest from '../get-hierarchy-projects';
      jest.mock('../get-hierarchy-projects');

      test('demo', () => {
        // 方案一
        getHierarchyProjectsRequest.mockImplementation(() => [])

        // 方案二
        在模块的同级目录下新建__mocks__/模块名字，实现一个新的mock函数
      })
      ```

   4. 分

7. decorator: 装饰器理解，装饰某个对象的某个属性，对于 class 属性，传入的对象是 function，对于方法装饰器（静态的传入的是 constructor 方法，实例方法是 class 的 prototype），属性装饰器也是一样，分为 static 和 instance，target 代表的意义跟方法装饰器一样。
