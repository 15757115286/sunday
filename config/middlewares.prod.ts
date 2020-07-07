import { PureObject } from '../definitions/common';
import { MiddlewareConfig } from '../definitions/core';

const middlewaresConfig:PureObject<MiddlewareConfig> = {
    'sunday-static': {
        enable: true,
        priority: 80,
        options: {
            root:[
                'client/dist'
            ]
        }
    }
}

export = middlewaresConfig;