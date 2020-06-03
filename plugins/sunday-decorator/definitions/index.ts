import { PureObject } from '../../../definitions/common';
import { BaseContext, Next } from 'koa';

export interface IClass<T = PureObject> {
    new(...args: any[]): T;
    __isController?: boolean;
    path?: string;
}

interface _ControllerOptions {
    route: string;
    name: string;
}

export interface ControllerRouterInfo {
    baseRoute: string;
    controllerName: string;
    controller: IClass,
    routeItems: PureObject<Partial<RouterItem>>
}

export interface RouterItem {
    methods: Method[],
    action: (ctx: BaseContext, next:Next) => void,
    route: string;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'CONNECT' | 'DELETE' | 'TRACE' | 'HEAD';

export type ControllerOptions = Partial<_ControllerOptions> | string;

export type ReturnFunction = (ctx:BaseContext, next:Next) => any;