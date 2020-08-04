import Koa from 'koa';
import { PureObject, NumberLike, StringLike } from '../definitions/common';
import type Application from 'koa';

type EntryType = 'framework' | 'plugin' | 'app';
export interface CoreEntry {
    type: EntryType;
    name: string;
    path: string;
}
export interface BaseApplication<A = any, C = any> extends Application<A, C> {
    options: SundayOptions;
    pluginConfig: PureObject<PluginConfigItem>;
    loaderConfig: PureObject<LoaderConfigItem>;
    coreEntries: CoreEntry[];
    loadersQueue: LoaderConfigItem[];
}
export interface SundayOptions<T = any> extends PureObject<T | NumberLike> {
    root: string;
    port: NumberLike;
    env: string;
}

export interface LoaderConfigItem {
    name: string;
    enable: boolean;
    priority: number;
    options: LoaderConfig
}
export type Pattern = string | string[];
// 配置中可以拥有的pattern类型
type PatternKeys = 'pattern' | 'configPattern';
export type LoaderConfig = {
    [K in PatternKeys]+?: Pattern;
} & PureObject;

export interface LoaderParameter {
    app: BaseApplication,
    coreEntries?: CoreEntry[],
    config: LoaderConfig
}

export interface EntryCallback {
    (entries: string[], coreEntry: CoreEntry | string): any;
}

export interface CoreLoaderParameter {
    app: BaseApplication,
    sunday?: any;
}

export interface PluginConfigItem {
    enable: boolean;
    path: string;
    owner: string;
}

/**
 * match的优先级大于ignore。 如果有match和ignore并存那么程序只会判断match
 */
export interface MiddlewareConfig {
    priority: number;
    enable: boolean;
    options?: MiddlewareItemConfig;
    match?: StringLike | StringLike[];
    ignore?: StringLike | StringLike[];
    name?: string;
}

export type MiddlewareItemConfig = PureObject

export interface Middleware<T = any> {
    (ctx:Koa.Context, next:Koa.Next): Promise<T>;
}
export interface WrappedMiddleware {
    (config:MiddlewareItemConfig, app:BaseApplication): Middleware;
}

export interface MergeFunction {
    (...objs: PureObject[]): PureObject;
    (clone:boolean, ...objs: PureObject[]):PureObject;
}
