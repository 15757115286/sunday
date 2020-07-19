import Loader from '../../../core/Loader';
import { IService } from '../definitions';
import { PureObject } from '../../../definitions/common';
import { outputJSON } from '../../../core/lib/util';

declare module '../../../definitions/core'{
    interface BaseApplication {
        services: IService[]
    }
}
class SundayServiceLoader extends Loader {
  load() {
    const servicePattern = this.config.pattern;
    const services: IService[] = [];
    const serviceInfo:PureObject = {};
    this.app.services = services;
    if (!servicePattern) {
      return;
    }
    this.getGlobalEntry(servicePattern, entires => {
      entires.forEach(entry => {
        const _service:any = require(entry);
        const service:IService = _service.default || _service;
        if (service === undefined || !service.__isService) {
          throw new TypeError(`can not find a service at ${entry}`);
        }
        service.path = entry;
        services.push(service);
        serviceInfo[entry.replace(/\.[^.]+$/, '')] = service.serviceName;
      });
    });
    outputJSON(`${this.app.options.root}/run/services.config.json`, serviceInfo);
  }
}

export = SundayServiceLoader;