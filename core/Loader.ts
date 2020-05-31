import { CoreEntry, BaseApplication, LoadOptions, LoaderParameter, EntryCallback } from "../definitions/core";
import { Pattern } from '../definitions/core';
import * as path from 'path';
import * as glob from 'fast-glob';

const NOT_INCLUDE_SUFFIX = /d\.ts$/;

abstract class Loader {
    coreEntries!: CoreEntry[];
    app!: BaseApplication;
    config!: LoadOptions;
    constructor(params: LoaderParameter) {
        this.app = params.app;
        this.coreEntries = params.coreEntries || [];
        this.config = params.config || {};
    }

    abstract load(): void;

    getEntry(base: string, pattern: Pattern, callback: EntryCallback) {
        if(typeof pattern === 'string') {
            pattern = [pattern];
        }
        pattern = pattern.map(pat => path.join(base, pat));
        const entries = glob.sync(pattern);
        callback(entries.filter(entry => !NOT_INCLUDE_SUFFIX.test(entry)));
    }

    getGlobalEntry(pattern: Pattern, callback: EntryCallback) {
        this.coreEntries.forEach(entry => {
            this.getEntry(entry.path, pattern, callback);
        })
    }

    resolvePathName(resolvePath: string): string{
        if(!resolvePath) return '';
        return path.basename(resolvePath).replace(/\.[^\.]+$/, '');
    }
}

export default Loader;