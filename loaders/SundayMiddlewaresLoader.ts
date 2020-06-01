import Loader from '../core/Loader';
import { PureObject } from '../definitions/common';
import { MiddlewareConfig, WrappedMiddleware } from '../definitions/core';
import { isFunction, isPlainObject, merge, outputJSON } from '../core/lib/util';

declare module '../definitions/core' {
    interface BaseApplication<A = any, C = any> {
        sundayMiddlewares: PureObject<WrappedMiddleware>;
        sundayMiddlewaresQueue: MiddlewareConfig[];
    }
}

class SundayMiddlewaresLoader extends Loader {
    load() {
        let configQueue: MiddlewareConfig[] = [];
        const middlewaresMap: PureObject<WrappedMiddleware> = {};
        let middlewaresPattern = this.config.pattern;
        let middlewaresConfigPattern = this.config.configPattern;
        if (middlewaresPattern && middlewaresConfigPattern) {
            if (!Array.isArray(middlewaresPattern)) {
                middlewaresPattern = [middlewaresPattern];
            }
            if (!Array.isArray(middlewaresConfigPattern)) {
                middlewaresConfigPattern = [middlewaresConfigPattern];
            }
            // 获取所有中间件
            middlewaresPattern.forEach(pattern => {
                this.getGlobalEntry(pattern, (entries => {
                    entries.forEach(entry => {
                        const middlewareName = this.resolvePathName(entry);
                        const middleware = <WrappedMiddleware>require(entry);
                        if (!isFunction(middleware)) {
                            throw new TypeError(`【${middlewareName}】 is not a middleware!`);
                        }
                        middlewaresMap[middlewareName] = middleware;
                    });
                }));
            });
            // 获取所有中间件配置
            let middlewaresConfig: PureObject<MiddlewareConfig> = {};
            middlewaresConfigPattern.forEach(pattern => {
                this.getGlobalEntry(pattern, entries => {
                    entries.forEach(entry => {
                        const currentConfig = <PureObject<MiddlewareConfig>>require(entry);
                        if (!isPlainObject(currentConfig)) {
                            throw new TypeError(`can not find middlewares config in path ${entry}!`);
                        }
                        middlewaresConfig = merge(middlewaresConfig, currentConfig);
                    });
                });
            });
            configQueue = Object.keys(middlewaresConfig)
                .map(key => {
                    const config = middlewaresConfig[key];
                    config.name = key;
                    return config;
                })
                .filter(config => config.enable)
                .sort((a, b) => {
                    return a.priority - b.priority;
                });
            outputJSON(`${this.app.options.root}/run/middlewares.config.json`, configQueue);
        }
        // 读取中间件的配置
        this.app.sundayMiddlewares = middlewaresMap;
        this.app.sundayMiddlewaresQueue = configQueue;
    }
}

export = SundayMiddlewaresLoader;