import { PureObject } from "../../../definitions/common";
import { MiddlewareConfig } from '../../../definitions/core';
import { Context } from 'koa';

const middlewaresConfig:PureObject<MiddlewareConfig> = {
    'sunday-body': {
        enable: true,
        priority: 100
    },
    // @see https://www.npmjs.com/package/koa-static
    'sunday-static': {
        enable: true,
        priority: 80,
        options: {
            root:[
                'static'
            ],
            options: {
                setHeaders(response: any) {
                    response.setHeader('Served-By', 'koa-static')
                }
            }
        }
    }
}

export = middlewaresConfig;