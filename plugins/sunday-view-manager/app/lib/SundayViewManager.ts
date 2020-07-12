import { BaseApplication } from '../../../../definitions/core';
import { getConfig } from './util';
import { ViewManagerConfig } from '../../definitions';
import { ViewEngineConstructor } from './ViewEngine';

class SundayViewManager extends Map {
    app: BaseApplication;
    constructor (app: BaseApplication) {
      super();
      this.app = app;
    }

    use (name: string, viewEnginer: ViewEngineConstructor) {
      this.set(name, viewEnginer);
    }

    getEngine (name: string): ViewEngineConstructor {
      const config: ViewManagerConfig = getConfig(this.app);
      const defaultEnginerName = config.default!;
      const viewEnginer: ViewEngineConstructor = this.get(name) || this.get(defaultEnginerName);
      return viewEnginer;
    }
}

export default SundayViewManager;