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

- 优化代码和声明文件。
- 框架整体异常捕获和处理
- nunjucks一些同步api需要改写成为异步
- webpack 需要抽离出来，区分打包环境。抽离公共css