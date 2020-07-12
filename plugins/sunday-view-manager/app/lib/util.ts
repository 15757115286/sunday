import { BaseApplication } from '../../../../definitions/core';

const CONFIG_KEY = 'sunday-view-manager';
export function getConfig (app: BaseApplication) {
  return app.config[CONFIG_KEY];
}