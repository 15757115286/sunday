import { BaseApplication } from '../../../definitions/core';
import { ViewManagerConfig } from '../definitions';
import path = require('path');

export const DEFAULT_ENGINE_NAME = 'nunjucks';
function config (app: BaseApplication): { 'sunday-view-manager': ViewManagerConfig } {
  return {
    'sunday-view-manager': {
      root: path.join(app.options.root, 'app/views'),
      mapping: {
        '.html': DEFAULT_ENGINE_NAME
      },
      default: DEFAULT_ENGINE_NAME
    }
  };
}

export default config;