import { PureObject } from "../../../definitions/common";
import { MiddlewareConfig } from '../../../definitions/core';

const middlewaresConfig:PureObject<MiddlewareConfig> = {
    'sunday-nunjucks-assets': {
        enable: true,
        priority: 65,
        match: /^\/?nunjucks\/(?:js|css)\/.+?\.(?:js|css)$/,
        options: {
            port: 7009,
            hostname: '127.0.0.1',
            protocol: 'http',
            publicPath:'/'
        }
    }
}

export = middlewaresConfig;