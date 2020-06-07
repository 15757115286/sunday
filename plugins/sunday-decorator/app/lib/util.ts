import { IClass, ControllerRouterInfo } from '../../definitions';
import { STORE_KEY, PROVIDE_KEY } from './store';

export function isString(str: any): str is string {
    return typeof str === 'string';
}

export function getControllStore<T extends IClass> (controller: T):Partial<ControllerRouterInfo> {
    let store = controller[STORE_KEY];
    if(store === undefined) {
        store = controller[STORE_KEY] = {};
    }
    return store;
}

export function getProvides<T extends IClass> (controller: T) {
    let provides = controller[PROVIDE_KEY];
    if(provides === undefined) {
        provides = controller[PROVIDE_KEY] = {};
    }
    return provides;
}