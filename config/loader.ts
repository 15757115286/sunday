import { PureObject } from '../definitions/common';
import { LoaderConfigItem } from '../definitions/core';

const EXTENDSION = 'ts|js';
const ENV = process.env.NODE_ENV || 'dev';

const loaderConfig: PureObject<Partial<LoaderConfigItem>> = {
    'SundayConfigLoader': {
        enable: true,
        priority: 1,
        options: {
            pattern: `config/**/*.(${EXTENDSION})`
        }
    },
    'SundayRouterLoader': {
        priority: 100,
        options: {
            pattern: `app/routers/**/*.(${EXTENDSION})`
        }
    },
    'SundayMiddlewaresLoader': {
        priority: 101,
        options: {
            pattern: `app/middlewares/*.(${EXTENDSION})`,
            configPattern: [
                `config/**/middlewares.(${EXTENDSION})`,
                `config/**/middlewares.${ENV}.(${EXTENDSION})`
            ]
        }
    }
};
export = loaderConfig;