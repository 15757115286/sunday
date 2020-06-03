import { ControllerRouterInfo } from '../../definitions';
import { STORE_KEY } from './store';

export default function Route(route: string = '/') {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const constructor = target.constructor;
        const controllerStore:Partial<ControllerRouterInfo> = constructor[STORE_KEY] || (constructor[STORE_KEY] = {});
        const routeItems = controllerStore.routeItems = controllerStore.routeItems || {};
        const item = routeItems[propertyKey] = routeItems[propertyKey] || {};
        item.route = route;
        item.action = descriptor.value;
    }
}