import { PureObject } from "../../../definitions/common";
import { MiddlewareConfig } from '../../../definitions/core';

const middlewaresConfig:PureObject<MiddlewareConfig> = {
    'sunday-nunjucks-assets': {
        enable: true,
        priority: 65,
        options: {
            port: 7009,
            hostname: '127.0.0.1',
            protocol: 'http',
            publicPath:'/',
            // 配置转发给web-dev-server的正则，可以是字符串
            redirectMatch: [
                /hot-update/
            ],
            fileNameReg: /nunjucks\/(.+)|js\/sunday-chunks/
        }
    }
}

export = middlewaresConfig;