import { IClass, ControllerOptions, ControllerRouterInfo, BaseController } from '../../definitions';
import { isString, getControllStore } from './util';
import { controllerRouterInfo } from './store';
import { BaseApplication } from '../../../../definitions/core';
import { BaseContext } from 'koa';
import { initService } from './inject';
function Controller(options: ControllerOptions = { route: '/' }) {
    return function <T extends IClass, K extends T>(constructor: T): K{
        if (isString(options)) {
            options = {
                route: options
            }
        }
        if (!options.name) {
            options.name = constructor.name;
        }
        constructor =  class extends constructor implements BaseController {
            app!: BaseApplication;
            ctx!: BaseContext;
            constructor(...args:any[]) {
                super(args);
                const config = args[0] || {};
                const app:BaseApplication = config.app;
                const ctx:BaseContext = config.ctx;
                this.app = app;
                this.ctx = ctx;
                // 自动注入service实例
                initService(this, constructor, config);
            }
        }
        // 该属性是在Method函数中注入的
        const controllerStore:Partial<ControllerRouterInfo> = getControllStore(constructor);
        controllerStore.baseRoute = options.route;
        controllerStore.controller = constructor;
        controllerStore.controllerName = options.name;
        controllerRouterInfo.push(controllerStore as  ControllerRouterInfo);
        constructor.__isController = true;
        return constructor as K;
    }
}


export default Controller;