import { PureObject } from '../definitions/common';
import { LoaderConfigItem } from '../definitions/core';

const EXTENDSION = '(ts|js)';
const ENV = process.env.NODE_ENV || 'dev';

const loaderConfig: PureObject<Partial<LoaderConfigItem>> = {
    'SundayConfigLoader': {
        enable: true,
        priority: 5,
        options: {
            pattern: `config/**/*.${EXTENDSION}`
        }
    },
    'SundayExtendsLoader': {
        enable: true,
        priority: 105,
        options: {
            pattern: `app/**/extends/(context|request|response|application).${EXTENDSION}`
        }
    },
    'SundayMiddlewaresLoader': {
        priority: 120,
        options: {
            pattern: `app/middlewares/*.${EXTENDSION}`,
            configPattern: [
                `config/**/middlewares.${EXTENDSION}`,
                `config/**/middlewares.${ENV}.${EXTENDSION}`
            ]
        }
    }
};
export = loaderConfig;