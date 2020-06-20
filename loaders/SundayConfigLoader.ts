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
        const result = {};
        this.getGlobalEntry(pattern, entries => {
            entries.forEach(entry => {
                let config = require(entry);
                config = config.default || config;
                merge(result, config);
            });

        });
        this.app.config = result;
    }
}

export = SundayConfigLoader;