import { PureObject } from '../definitions/common';
import { MiddlewareConfig } from '../definitions/core';

const middlewaresConfig:PureObject<MiddlewareConfig> = {
    'sunday-nunjucks-assets': {
        enable: true,
        priority: 65,
        options: {
            redirectMatch: [
                /hot-update/,
                /js\/(?:vendors~)?saturday\//,
                /iconfont\.(?:svg|woff|eot|ttf)/,
                /js\/sunday-chunks\//
            ]
        }
    }
}

export = middlewaresConfig;