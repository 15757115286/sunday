import { CoreEntry, BaseApplication, LoaderConfig, LoaderParameter, EntryCallback } from "../definitions/core";
import { Pattern } from '../definitions/core';
import * as path from 'path';
import * as glob from 'fast-glob';
import { isCoreEntry } from './lib/util';

const NOT_INCLUDE_SUFFIX = /\.d\.ts$/;

/**
 * 基本的加载器，用于读取配置文件或者插件等作用
 */
abstract class Loader {
    coreEntries!: CoreEntry[];
    app!: BaseApplication;
    config!: LoaderConfig;
    constructor(params: Partial<LoaderParameter>) {
        this.app = <BaseApplication>params.app;
        this.coreEntries = params.coreEntries || [];
        this.config = params.config || {};
    }

    abstract load(): void;

    getEntry(base: string | CoreEntry, pattern: Pattern, callback: EntryCallback) {
        if (typeof pattern === 'string') {
            pattern = [pattern];
        }
        const basePath = isCoreEntry(base) ? base.path : base;
        pattern = pattern.map(pat => {
            const temp = path.join(basePath, pat);
            // 为了兼容window文件路径
            return temp.replace(/\\/g, '/');
        });
        const entries:string[] = glob.sync(pattern);
        callback(entries.filter(entry => !NOT_INCLUDE_SUFFIX.test(entry)), base);
    }

    getGlobalEntry(pattern: Pattern, callback: EntryCallback) {
        this.coreEntries.forEach(entry => {
            this.getEntry(entry, pattern, callback);
        })
    }

    resolvePathName(resolvePath: string): string {
        if (!resolvePath) return '';
        return path.basename(resolvePath).replace(/\.[^\.]+$/, '');
    }
}

export default Loader;