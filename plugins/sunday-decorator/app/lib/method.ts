import { Method as _Method, IClass } from '../../definitions';
import { getControllStore } from './util';

export default function Method(methods: _Method[]| _Method) {
  return function(target: any, propertyKey: string) {
    const constructor:IClass = target.constructor;
    const controllerStore = getControllStore(constructor);
    const routeItems = controllerStore.routeItems = controllerStore.routeItems || {};
    const item = routeItems[propertyKey] = routeItems[propertyKey] || {};
    if (typeof methods === 'string') methods = [methods];
    if (item.methods === undefined) {
      item.methods = methods;
    } else {
      item.methods.push(...methods);
    }
  };
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