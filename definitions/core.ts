import Koa from 'koa';
import { PureObject, NumberLike } from '../definitions/common';

type EntryType = 'framework' | 'plugin' | 'app';
export interface CoreEntry {
    type: EntryType;
    name: string;
    path: string;
}
export interface BaseApplication<A = any, C = any> extends Koa<A, C> {
    options: SundayOptions
}
export interface SundayOptions<T = any> extends PureObject<T | NumberLike>{
    root: string;
    port: NumberLike;
    env: string;
}
export interface BaseContext extends Koa.BaseContext{}

export interface LoadConfig{
    enable?: boolean;
    priority?: number;
    options?: LoadOptions
}
export type Pattern = string | string[];
// 配置中可以拥有的pattern类型
type PatternKeys = 'pattern' | 'configPattern';
export type LoadOptions = {
    [K in PatternKeys]+?: Pattern;
} & PureObject;

export interface LoaderParameter {
    app: BaseApplication,
    coreEntries?: CoreEntry[],
    config?: LoadOptions
}

export interface EntryCallback {
    (entries: string[]): any;
}

export interface CoreLoaderParameter {
    app: BaseApplication,
    sunday?: any;
}