import { IClass, ControllerRouterInfo, Provides } from '../../definitions';
import { STORE_KEY, PROVIDE_KEY } from './store';

export function isString(str: any): str is string {
    return typeof str === 'string';
}

export function get <T> (obj:any, key:string | symbol, defaultValue: T):T {
    if (!obj) return defaultValue;
    let result = obj[key];
    if (result === undefined) {
        result = obj[key] = defaultValue;
    }
    return result as T;
}

export function getControllStore<T extends IClass> (controller: T) {
    return get<Partial<ControllerRouterInfo>> (controller, STORE_KEY, {});
}

export function getProvides<T extends IClass> (controller: T) {
    return get<Provides> (controller, PROVIDE_KEY, {});
}