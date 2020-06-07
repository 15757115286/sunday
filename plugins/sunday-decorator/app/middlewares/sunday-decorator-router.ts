import { MiddlewareItemConfig, BaseApplication } from "../../../../definitions/core";
import { RouterItem } from '../../definitions';
import { BaseContext, Next } from 'koa';
const compose = require('koa-compose');
const Router = require('koa-router');

// 把controller加载通过koa-router变成router信息
function factory(config:MiddlewareItemConfig, app:BaseApplication) {
    const AllRoute = new Router();
    const controllerRouterInfo = app.controllerRouterInfo;
    for(let key in controllerRouterInfo) {
        const routerInfo = controllerRouterInfo[key];
        let { baseRoute, controller, routeItems } = routerInfo;
        baseRoute = baseRoute.replace(/\/$/, '');
        for(let actionName in routeItems) {
            const item = routeItems[actionName];
            let { methods, route } = item as RouterItem;
            if(!/^\//.test(route)) {
                route = '/' + route;
            }
            const finalRoute = baseRoute + route;
            if(!methods || methods.length === 0) {
                const defaultMethods = config.defaultMethods;
                if(Array.isArray(defaultMethods) && defaultMethods.length > 0) {
                    methods = defaultMethods;
                } else {
                    methods = ['GET', 'POST'];
                }
            }
            methods.forEach(method => {
                AllRoute[method.toLocaleLowerCase()](finalRoute, async (ctx: BaseContext, next:Next) => {
                    await (new controller({ app, ctx }))[actionName]();
                    await next();
                });
            });
        }
    }
    return compose([AllRoute.routes(), AllRoute.allowedMethods()]);
}

export = factory;