import { IService, ServiceOptions, BaseService } from '../../definitions';
import { isString } from './util';
import { BaseApplication } from '../../../../definitions/core';
import { BaseContext } from 'koa';

export default function Service (options: ServiceOptions) {
  return function<T extends IService, K extends T> (constructor:T): K {
    if (isString(options)) {
      options = {
        name: options
      };
    }
    if (!options.name) {
      options.name = constructor.name;
    }
    constructor = class extends constructor implements BaseService {
            app!: BaseApplication;
            ctx!: BaseContext;
            options: ServiceOptions;
            constructor (...args:any[]) {
              super(args);
              const config = args[0] || {};
              this.app = config.app;
              this.ctx = config.ctx;
              this.options = options;
            }
    };
    constructor.serviceName = options.name;
    constructor.__isService = true;
    return constructor as K;
  };
}