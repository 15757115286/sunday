import { PureObject } from "../../../definitions/common";
import { LoaderConfigItem } from '../../../definitions/core';

const EXTENDSION = 'ts|js';

const loaderConfig: PureObject<Partial<LoaderConfigItem>> = {
    'SundayRouterLoader': {
        enable: true,
        priority: 20,
        options: {
            pattern: `app/controllers/**/*.(${EXTENDSION})`
        }
    }
}

export = loaderConfig;