import { PureObject } from "../../../definitions/common";
import { MiddlewareConfig } from '../../../definitions/core';

const MiddlewaresConfig:PureObject<MiddlewareConfig> = {
    'sunday-router': {
        priority: 100,
        enable: true,
        ignore:'/xwt',
        options: {
            name:'xwt'
        }
    }
}

export = MiddlewaresConfig;