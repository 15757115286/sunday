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

sunday框架是继承自EventEmitter，所以说它会在加载完核心的配置以后触发对应的，如当加载完loaders配置以后，会有一个时间点让开发者修改配置。