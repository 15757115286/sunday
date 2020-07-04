import Loader from "../core/Loader";
import { merge } from '../core/lib/util';
import { PureObject } from '../definitions/common';

declare module '../definitions/core' {
    interface BaseApplication {
        config: PureObject;
    }
}

class SundayConfigLoader extends Loader {
    load() {
        const config = this.config;
        let { pattern } = config;
        if (!pattern) {
            return;
        }
        if (!Array.isArray(pattern)) {
            pattern = [pattern];
        }
        const result = {};
        // 其实getGlobalEntry支持数组，但是为了控制合并顺序，所以这么写
        pattern.forEach(pat => {
            this.getGlobalEntry(pat, entries => {
                entries.forEach(entry => {
                    let config = require(entry);
                    config = config.default || config;
                    if (typeof config === 'function') {
                        config = config(this.app);
                    }
                    merge(result, config);
                });
    
            });
        });
        this.app.config = result;
    }
}

export = SundayConfigLoader;