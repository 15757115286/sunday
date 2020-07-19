import { PureObject } from '../../../../definitions/common';
import { Context } from 'koa';
import { BaseApplication } from '../../../../definitions/core';
import { getConfig } from '../lib/util';
import { ViewManagerConfig } from '../../definitions';
import { DEFAULT_ENGINE_NAME } from '../../config/config';
import path = require('path');

export default {
  async render(this:Context, name: string, context?: PureObject, isAsync = true): Promise<string> {
    const app = this.app as BaseApplication;
    const config: ViewManagerConfig = getConfig(app);
    const ext = path.extname(name);
    const engineName = config.mapping![ext] || config.default!;
    const ViewEngineConstructor = app.view.getEngine(engineName);
    const instance = new ViewEngineConstructor(this, app, config.root!);
    const result = await instance.render(name, context, isAsync) as string;
    this.body = result;
    return result;
  },

  async renderString(this:Context, str: string, context?: PureObject, isAsync = true, engineName = DEFAULT_ENGINE_NAME): Promise<string> {
    const app = this.app as BaseApplication;
    const config: ViewManagerConfig = getConfig(app);
    engineName = engineName || config.default!;
    const ViewEngine = app.view.getEngine(engineName);
    const instance = new ViewEngine(this, app, config.root!);
    const result = await instance.render(str, context, isAsync) as string;
    this.body = result;
    return result;
  },

  setGlobal(this: Context, name: string, value: any) {
    const _global = this._global = this._global || {};
    _global[name] = value;
  },

  getGlobal(this: Context, name?: string) {
    const _global = this._global || {};
    if (name) {
      return _global[name];
    } else {
      return _global;
    }
  }
};