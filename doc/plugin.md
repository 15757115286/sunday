## 插件

### 注意点

我们需要注意的是如果你是使用`typescript`进行编写插件配置的。我们必须使用如下的语法进行配置的导出。`export default`语法并不能兼容CommonJS和AMD的exports。

```javascript
// 推荐的导出方式，相当于下面的导出方式。ts为了兼容CommonJS和AMD的exports的导出方式
export = config;
// 或者通用的导出方式，直接js文件
module.exports = config;
// 无效的导出方式
export default config;
export {
    config
}
```