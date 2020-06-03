import { IClass, ControllerOptions, ControllerRouterInfo, Method } from '../../definitions';
import { isString } from './util';
import { STORE_KEY, controllerRouterInfo } from './store';
function Controller(options: ControllerOptions = { route: '/' }) {
    return function <T extends IClass>(constructor: T) {
        if (isString(options)) {
            options = {
                route: options
            }
        }
        if (!options.name) {
            options.name = constructor.name;
        }
        const controllerStore:Partial<ControllerRouterInfo> = (constructor as any)[STORE_KEY];
        controllerStore.baseRoute = options.route;
        controllerStore.controller = constructor;
        controllerStore.controllerName = options.name;
        controllerRouterInfo.push(controllerStore as  ControllerRouterInfo);
        constructor.__isController = true;
    }
}


export default Controller;