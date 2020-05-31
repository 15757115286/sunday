import Koa from 'koa';
import { PureObject, NumberLike } from '../definitions/common';

type EntryType = 'framework' | 'plugin' | 'app';
export interface CoreEntry {
    type: EntryType;
    name: string;
    path: string;
}
export interface BaseApplication<A = any, C = any> extends Koa<A, C>, PureObject {
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
export interface BaseContext extends Koa.BaseContext { }

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