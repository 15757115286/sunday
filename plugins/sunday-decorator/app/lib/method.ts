import { Method as _Method, ControllerRouterInfo, ReturnFunction } from '../../definitions';
import { STORE_KEY } from './store';

export default function Method(methods: _Method[]| _Method) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const constructor = target.constructor;
        const controllerStore:Partial<ControllerRouterInfo> = constructor[STORE_KEY] || (constructor[STORE_KEY] = {});
        const routeItems = controllerStore.routeItems = controllerStore.routeItems || {};
        const item = routeItems[propertyKey] = routeItems[propertyKey] || {};
        if(typeof methods === 'string') methods = [methods];
        item.methods = methods;
    }
}

export const Get = Method('GET');
export const Post = Method('POST');
export const Patch = Method('PATCH');
export const Delete = Method('DELETE');
export const Options = Method('OPTIONS');
export const Connect = Method('CONNECT');
export const Put = Method('PUT');
export const Trace = Method('TRACE');
export const Head = Method('HEAD');
export const Common = Method(['GET', 'POST']);