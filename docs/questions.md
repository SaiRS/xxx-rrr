1. 运行 ts-node 使用，需要将 tsconfig.json 中的 module 改成 commonJs,不然运行会出错（因为 ts-node 只认识 CommonJS)
2. 使用tailwind，用作底层的css框架（非UI框架)
3. 为了减少css文件的大小，使用了purgecss（移除不使用的css)
