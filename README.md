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

### lint

本项目推荐使用vscode来开发，在插件市场中安装eslint插件进行代码格式检查。

### router

本项目app中路由对koa-router进行了封装，并且使用了typescript中的装饰符，使用方式如下
顺序是从上至下进行匹配，如果成功匹配或者进行了重定向，则不会继续执行下面的路由。

```typescript
import { Context } from 'koa';
import { Controller, Route, Get } from '../../plugins/sunday-decorator/app/lib';
import { BaseApplication } from '../../definitions/core';

@Controller('/ui')
class SundayUiController {
    app: BaseApplication;
    ctx: Context;

    @Get
    @Route('/:component*')
    async getComponent () {
      this.ctx.setGlobal('title', 'sunday-ui');
      await this.ctx.render('sunday-ui.html');
    }
}
export default SundayUiController;

```

### 静态资源
静态资源统一在`client/pages/xxxx/assets`下，引用的时候通过`/xxxx/assets/xxx.png`来引用。

### vue中使用注解开发
[注解文档](https://github.com/kaorun343/vue-property-decorator)

### 生产环境
由于这边使用了tsconfig.json中的paths映射，所以同步使用`tsconfig-paths`包来使用，具体可以参考[tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)。但是编译过后的文件也不会进行路径的转化。所以这里使用的是自动探测`tsconfig.json`下的paths，使用`module-alias`进行模块注册。

### TODO

- 优化代码和声明文件。
- 框架整体异常捕获和处理
- nunjucks一些同步api需要改写成为异步
- 处理dev-server静态资源服务和打包时候静态资源处理
- 生产环境在打包时候webpack资源没有打进app/dist目录，需要加此功能