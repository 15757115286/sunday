import { PureObject } from '../definitions/common';
import { LoaderConfigItem } from '../definitions/core';

const EXTENDSION = 'ts|js';
const loaderConfig: PureObject<Partial<LoaderConfigItem>> = {
    'SundayConfigLoader': {
        enable:false,
        priority: 1,
        options: {
            pattern: `config/**/*.(${EXTENDSION})`
        }
    },
    'SundayRouterLoader': {
        priority: 10,
        options: {
            pattern: `app/routers/**/*.(${EXTENDSION})`
        }
    }
};
export = loaderConfig;