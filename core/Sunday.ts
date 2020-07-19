import * as Koa from 'koa';
import path from 'path';
import * as chalk from 'chalk';
import { SundayOptions, BaseApplication } from '../definitions/core';
import { NumberLike } from '../definitions/common';
import CoreLoader from './CoreLoader';

export const BASE_DIR = Symbol('base_dir');
class Sunday {
  get [BASE_DIR]() {
    return path.join('..', __dirname);
  }

    app!:BaseApplication;
    options!:SundayOptions;
    constructor(options:Partial<SundayOptions> = {}) {
      options.port = this.getPort(options);
      options.root = this.getRoot(options);
      options.env = this.getEnv(options);
      this.options = <SundayOptions>options;
      this.init();
      this.start();
    }

    init(this:Sunday) {
      const app:BaseApplication = this.app = <BaseApplication> new Koa();
      app.options = this.options;
      const coreLoader = new CoreLoader({
        app,
        sunday: this
      });
      coreLoader.load();
    }

    start() {
      const port = this.options.port;
      console.log(chalk.green(`the application is start at the port 【${port}】`));
      this.app.listen(port);
    }

    getPort(options:Partial<SundayOptions>):NumberLike {
      return options.port || '3000';
    }

    getRoot(options:Partial<SundayOptions>):string {
      return options.root || process.cwd();
    }

    getEnv(options:Partial<SundayOptions>): string {
      return options.env || process.env.NODE_EVN || 'dev';
    }
}

export default Sunday;