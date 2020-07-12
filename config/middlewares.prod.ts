import { PureObject } from '../definitions/common';
import { MiddlewareConfig } from '../definitions/core';

const middlewaresConfig:PureObject<MiddlewareConfig> = {
  'sunday-static': {
    enable: true,
    priority: 80,
    options: {
      root: [
        'client/dist'
      ]
    }
  },
  'sunday-nunjucks-assets': {
    enable: true,
    priority: 65,
    options: {
      fileNameReg: /nunjucks\/(.+)|(?:js|css)\/sunday-chunks/,
      emptyReg: /^\/css\/vendors/
    }
  }
};

export = middlewaresConfig;