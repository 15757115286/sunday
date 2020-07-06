import { PureObject } from '../definitions/common';
import { MiddlewareConfig } from '../definitions/core';

const middlewaresConfig:PureObject<MiddlewareConfig> = {
    'sunday-nunjucks-assets': {
        enable: true,
        priority: 65,
        options: {
            redirectMatch: [
                /hot-update/,
                /js\/(?:vendors~)?saturday\//
            ]
        }
    },
    'sunday-auto-refresh': {
        enable: false,
        priority: 75
    }
}

export = middlewaresConfig;