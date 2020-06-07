import { PureObject } from '../../../definitions/common';
import { BaseContext, Next } from 'koa';
import { BaseApplication } from '../../../definitions/core';
import { STORE_KEY, PROVIDE_KEY } from '../app/lib/store';

interface BaseOptions {
    app: BaseApplication;
    ctx: BaseContext;
}
export interface BaseController extends BaseOptions{}
export interface BaseService extends BaseOptions{
    options: ServiceOptions;
}

/**
 * IClass 和 IService 中的path 代表的是文件路径
 */
export interface IClass<T = PureObject> {
    new(...args: any[]): T;
    __isController?: boolean;
    path?: string;
    [STORE_KEY]?: Partial<ControllerRouterInfo>;
    [PROVIDE_KEY]?: Provides
}

export interface IServiceInstance {
    __isService?: boolean;
    serviceName?: string;
    path?: string;
}
export interface IService<T = PureObject> extends IServiceInstance{
    new(...args: any[]): T;
}

interface _ControllerOptions {
    route: string;
    name: string;
}

interface _ServiceOptions {
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

export interface Provides extends PureObject<IService> {}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'CONNECT' | 'DELETE' | 'TRACE' | 'HEAD';

export type ControllerOptions = Partial<_ControllerOptions> | string;

export type ServiceOptions = _ServiceOptions | string;

export type ReturnFunction = (ctx:BaseContext, next:Next) => any;