import { PureObject } from '../../../definitions/common';
import { MiddlewareConfig } from '../../../definitions/core';
import { ServerResponse } from 'http';

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
      root: [
        'static'
      ],
      options: {
        setHeaders (response: ServerResponse) {
          response.setHeader('Served-By', 'koa-static');
        }
      }
    }
  },
  'sunday-auto-refresh': {
    enable: true,
    priority: 75,
    options: {
      root: 'static',
      port: 4000,
      watch: [
        'static'
      ],
      socketPath: '/monitor'
    }
  }
};

export = middlewaresConfig;