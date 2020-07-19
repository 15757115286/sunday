import Loader from '../../../core/Loader';
import { PureObject } from '../../../definitions/common';
import { ControllerRouterInfo, IClass } from '../definitions';
import { controllerRouterInfo as _controllerRouterInfo } from '../app/lib/store';
import { outputJSON } from '../../../core/lib/util';

declare module '../../../definitions/core' {
    interface BaseApplication {
        controllerRouterInfo:PureObject<ControllerRouterInfo>;
        controllers:IClass[];
    }
}

class SundayControllerLoader extends Loader {
  load() {
    const controllerPattern = this.config.pattern;
    const controllers: IClass[] = [];
    const controllerRouterInfo: PureObject<ControllerRouterInfo> = {};
    this.getGlobalEntry(controllerPattern!, entries => {
      entries.forEach(entry => {
        const _controller: any = require(entry);
        const controller:IClass = _controller.default || _controller;
        if (controller.__isController !== true) {
          throw new TypeError(`can not find a controller at ${entry}`);
        }
        controller.path = entry;
        const info = _controllerRouterInfo.find(info => {
          return info.controller === controller;
        });
        controllers.push(controller);
        controllerRouterInfo[entry.replace(/\.[^.]+$/, '')] = info!;
      });
    });
    this.app.controllers = controllers;
    this.app.controllerRouterInfo = controllerRouterInfo;
    outputJSON(`${this.app.options.root}/run/controllers.config.json`, controllerRouterInfo);
  }
}

export = SundayControllerLoader;