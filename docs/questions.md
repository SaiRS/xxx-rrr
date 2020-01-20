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

5.
