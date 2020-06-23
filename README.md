## sunday 结构说明

项目结构说明
```
.
├── README.md
├── app
│   ├── controllers
│   ├── extends
│   ├── middlewares
│   ├── routers
│   └── services
├── config
├── definitions
├── loaders
├── package.json
├── plugins
```
### 注意

sunday框架是继承自EventEmitter，所以说它会在加载完核心的配置以后触发对应的。

### TODO

- 编写关于路由的插件，使项目中的路由和装饰器路由并存。
- 优化代码和声明文件。
- 框架整体异常捕获和处理
- ts打包后无法拷贝静态资源，需要修复