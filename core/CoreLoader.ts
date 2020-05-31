import Loader from "./Loader";
import { CoreLoaderParameter, BaseApplication, CoreEntry } from '../definitions/core';
import * as path from 'path';
import { BASE_DIR } from './Sunday';

class CoreLoader extends Loader {
    app!: BaseApplication;
    coreEntries!: CoreEntry[];
    sunday!:any;
    constructor(params: CoreLoaderParameter) {
        super(params);
        this.app = params.app;
        this.sunday = params.sunday || {};
    }

    load() {
        this.getCoreEntry();
    }

    get pattern() {
        const env = this.app.options.env;
        return {
            pluginConfig: `config/**/plugin?(.${ env }).(js|ts)`,
            loaderConfig: `config/**/loader?(.${ env }).(js|ts)`,
            loaderPath: `loader/*.(js|ts)`
        }
    }
    /**
     * 获取应用和继承应用的主入口
     */
    getCoreEntry() {
        const root = this.app.options.root;
        const entries: CoreEntry[] = [
            {
                path: root,
                type: 'app',
                name: this.resolvePathName(root)
            }
        ];
        const Sunday = this.sunday.constructor;
        let proto: any = Sunday.prototype;
        while(proto = Reflect.getPrototypeOf(proto)) {
            const path = proto[BASE_DIR];
            if(typeof path !== 'string') continue;
            entries.unshift({
                path,
                type: 'framework',
                name: this.resolvePathName(path)
            });
        }
        this.coreEntries = entries;
    }
}

export default CoreLoader;