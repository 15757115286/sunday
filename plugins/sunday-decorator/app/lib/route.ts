import { IClass } from '../../definitions';
import { STORE_KEY } from './store';
import { getControllStore } from './util';

export default function Route(route: string = '/') {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const constructor: IClass = target.constructor;
        const controllerStore = getControllStore(constructor);
        const routeItems = controllerStore.routeItems = controllerStore.routeItems || {};
        const item = routeItems[propertyKey] = routeItems[propertyKey] || {};
        item.route = route;
        item.action = descriptor.value;
    }
}