import Loader from "./Loader";
import { CoreLoaderParameter, BaseApplication, CoreEntry, PluginConfigItem, LoaderConfigItem, MiddlewareItemConfig, MiddlewareConfig } from '../definitions/core';
import { BASE_DIR } from './Sunday';
import { PureObject } from '../definitions/common';
import { merge, outputJSON, isExtendsFrom, isMatch } from '../core/lib/util';
import Koa from 'koa';


class CoreLoader extends Loader {
    app!: BaseApplication;
    coreEntries!: CoreEntry[];
    sunday!: any;
    constructor(params: CoreLoaderParameter) {
        super(params);
        this.app = params.app;
        this.sunday = params.sunday || {};
    }

    load() {
        this.getCoreEntry();
        this.getPluginConfig();
        this.mergePluginEntriesToCoreEntries();
        this.getLoaderConfig();
        this.runLoaders();
        this.useMiddlewares();
    }

    get pattern() {
        const env = this.app.options.env;
        return {
            pluginConfig: `config/**/plugin?(.${env}).(js|ts)`,
            loaderConfig: `config/**/loader?(.${env}).(js|ts)`,
            loaderPath: `loaders/*.(js|ts)`
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
        while (proto = Reflect.getPrototypeOf(proto)) {
            const path = proto[BASE_DIR];
            if (typeof path !== 'string') continue;
            entries.unshift({
                path,
                type: 'framework',
                name: this.resolvePathName(path)
            });
        }
        this.coreEntries = entries;
    }

    /**
     * 获取插件的配置信息
     * 这边的entries是应用或者框架下config下目录下的所有插件配置
     * 它的合并顺序是无序的，依赖于系统返回文件的顺序
     */
    getPluginConfig(): PureObject<PluginConfigItem> {
        let mergedPluginConfig: PureObject<PluginConfigItem> = {};
        this.getGlobalEntry(this.pattern.pluginConfig, (entries, coreEntry) => {
            mergedPluginConfig = entries.reduce((mergedPluginConfig, entry) => {
                const currentPluginConfig: PureObject<PluginConfigItem> = require(entry);
                // 记录插件的归属者
                for (let key in currentPluginConfig) {
                    const config: PluginConfigItem = currentPluginConfig[key];
                    if (!config.owner) {
                        config.owner = (<CoreEntry>coreEntry).name;
                    }
                }
                return merge(mergedPluginConfig, currentPluginConfig);
            }, mergedPluginConfig);
        });
        this.app.pluginConfig = mergedPluginConfig;
        outputJSON(`${this.app.options.root}/run/plugin.config.json`, mergedPluginConfig);
        return mergedPluginConfig;
    }

    /**
     * 这边是把插件目录也当成核心的入口来对待，后期会从插件目录下加载controller或者其他配置
     */
    mergePluginEntriesToCoreEntries() {
        const pluginConfig = this.app.pluginConfig;
        const result: CoreEntry[] = [];
        this.coreEntries.forEach(entry => {
            const pushedArray: string[] = [];
            const name = entry.name;
            for (let key in pluginConfig) {
                const config = pluginConfig[key];
                // 剔除那些没有开启的插件
                if (config.owner === name && config.enable) {
                    pushedArray.push(key);
                    const path = config.path;
                    result.push({
                        type: 'plugin',
                        path,
                        name: this.resolvePathName(path)
                    });
                }
            }
            result.push(entry);
            pushedArray.forEach(key => delete pluginConfig[key]);
        });
        // 在插件数组头部推入不是框架或者应用中的插件
        for (let key in pluginConfig) {
            const config = pluginConfig[key];
            const path = config.path;
            if (!config.enable) continue;
            result.unshift({
                type: 'plugin',
                path,
                name: this.resolvePathName(path)
            });
        }
        this.coreEntries = this.app.coreEntries = result;
        outputJSON(`${this.app.options.root}/run/core-entries.json`, result);
    }

    // 加载所有项目中的加载器的配置文件。
    getLoaderConfig() {
        // 不执行插件中的加载器
        const entries = this.coreEntries.filter(entry => entry.type !== 'plugin');
        let mergedLoaderConfig: PureObject<LoaderConfigItem> = {};
        let loadersQueue: LoaderConfigItem[] = [];
        entries.forEach(entry => {
            this.getEntry(entry, this.pattern.loaderConfig, entries => {
                mergedLoaderConfig = entries.reduce((mergedLoaderConfig, entry) => {
                    const currentLoaderConfig: PureObject<LoaderConfigItem> = require(entry);
                    mergedLoaderConfig = merge(mergedLoaderConfig, currentLoaderConfig);
                    return mergedLoaderConfig;
                }, mergedLoaderConfig)
            });
        });
        for(let name in mergedLoaderConfig) {
            const loaderConfig = mergedLoaderConfig[name];
            if(!loaderConfig.name) {
                loaderConfig.name = name;
            }
            loadersQueue.push(loaderConfig);
        }
        loadersQueue = loadersQueue.filter(loader => loader.enable !== false).sort((a, b) => {
            return a.priority - b.priority;
        });
        this.app.loaderConfig = mergedLoaderConfig;
        this.app.loadersQueue = loadersQueue;
        outputJSON(`${this.app.options.root}/run/loader-queue.json`, loadersQueue);
    }

    /**
     * 运行所有的加载器
     */
    runLoaders() {
        const loadersQueue = this.app.loadersQueue;
        const canExecuteLoaders:PureObject<Loader> = {};
        this.getGlobalEntry(this.pattern.loaderPath, entries => {
            entries.forEach(entry => {
                const loaderName = this.resolvePathName(entry);
                const loaderClass = require(entry);
                if(isExtendsFrom(loaderClass, Loader)) {
                    canExecuteLoaders[loaderName] = loaderClass;
                } else {
                    throw new TypeError(`【${loaderName}】 is not a loader!`);
                }
            });
        });
        loadersQueue.forEach(config => {
            const loaderName = config.name;
            const loaderClass:Loader = canExecuteLoaders[loaderName];
            if(loaderClass === undefined) {
                throw new Error(`loader 【${loaderName}】 can not be found!`);
            }
            const loader:Loader = new (loaderClass as any)({
                app: this.app,
                coreEntries: this.coreEntries,
                config: config.options
            });
            loader.load();
        });
    }

    /**
     * 加载中间件
     */
    useMiddlewares() {
        const middlewaresQueue = this.app.sundayMiddlewaresQueue;
        const middlewares = this.app.sundayMiddlewares;
        middlewaresQueue.forEach((config:MiddlewareConfig) => {
            const middlewareName = config.name;
            const wrappedMiddleware = middlewares[middlewareName as string];
            const _middleware = wrappedMiddleware(config.options as MiddlewareItemConfig, this.app);
            const middleware = async function(ctx: Koa.BaseContext, next: Koa.Next) {
                const { match, ignore } = config;
                if(match) {
                    if(isMatch(ctx.path, match)) {
                        return await _middleware(ctx, next);
                    } else {
                        return await next();
                    }
                }
                if(ignore && isMatch(ctx.path ,ignore)) {
                    return await next();
                }
                return await _middleware(ctx, next);
            }
            this.app.use(middleware);
        });
    }
}

export default CoreLoader;