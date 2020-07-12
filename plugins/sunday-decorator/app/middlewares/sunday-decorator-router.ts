import { MiddlewareItemConfig, BaseApplication } from '../../../../definitions/core';
import { RouterItem } from '../../definitions';
import { Context, Next } from 'koa';
import { union } from '../lib/util';
const compose = require('koa-compose');
const Router = require('koa-router');
console.log(1);
// 把controller加载通过koa-router变成router信息
function factory (config:MiddlewareItemConfig, app:BaseApplication) {
  const AllRoute = new Router();
  const controllerRouterInfo = app.controllerRouterInfo;
  for (const key in controllerRouterInfo) {
    const routerInfo = controllerRouterInfo[key];
    let { baseRoute, controller: Controller, routeItems } = routerInfo;
    baseRoute = baseRoute.replace(/\/$/, '');
    for (const actionName in routeItems) {
      const item = routeItems[actionName];
      let { methods, route: routes } = item as RouterItem;
      methods = union(methods);
      routes = union(routes);
      routes = routes.map(route => {
        if (!/^\//.test(route)) {
          route = '/' + route;
        }
        return baseRoute + route;
      });
      if (!methods || methods.length === 0) {
        const defaultMethods = config.defaultMethods;
        if (Array.isArray(defaultMethods) && defaultMethods.length > 0) {
          methods = defaultMethods;
        } else {
          methods = ['GET', 'POST'];
        }
      }
      methods.forEach(method => {
        routes.forEach(route => {
          AllRoute[method.toLocaleLowerCase()](route, async (ctx: Context, next:Next) => {
            const { status } = ctx;
            // 证明已经被处理过或者重定向
            const successList = [200, 301, 302];
            if (!successList.includes(status)) {
              await (new Controller({ app, ctx }))[actionName]();
            }
            await next();
          });
        });
      });
    }
  }
  return compose([AllRoute.routes(), AllRoute.allowedMethods()]);
}

export = factory;