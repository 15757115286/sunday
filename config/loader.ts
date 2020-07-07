import { PureObject } from '../definitions/common';
import { LoaderConfigItem } from '../definitions/core';

const EXTENDSION = '(ts|js)';
const ENV = process.env.NODE_ENV || 'dev';

const loaderConfig: PureObject<Partial<LoaderConfigItem>> = {
    'SundayExtendsLoader': {
        enable: true,
        priority: 5,
        options: {
            pattern: `app/**/extends/(context|request|response|application).${EXTENDSION}`
        }
    },
    'SundayConfigLoader': {
        enable: true,
        priority: 10,
        options: {
            pattern: [
                `config/**/config.${EXTENDSION}`,
                `config/**/config.${ENV}.${EXTENDSION}`
            ]
        }
    },
    'SundayBootstrapLoader': {
        enable: true,
        priority: 30,
        options: {
            pattern: `plugins/**/bootstrap.${EXTENDSION}`
        }
    },
    'SundayMiddlewaresLoader': {
        priority: 120,
        options: {
            pattern: `app/middlewares/*.${EXTENDSION}`,
            configPattern: [
                `config/**/middlewares.${EXTENDSION}`,
                `config/**/middlewares\.${ENV}\.${EXTENDSION}`
            ]
        }
    }
};
export = loaderConfig;