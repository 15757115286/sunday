import { PureObject } from '../../../definitions/common';
import { LoaderConfigItem } from '../../../definitions/core';

const EXTENDSION = 'ts|js';

const loaderConfig: PureObject<Partial<LoaderConfigItem>> = {
  SundayControllerLoader: {
    enable: true,
    priority: 20,
    options: {
      pattern: `app/controllers/**/*.(${EXTENDSION})`
    }
  },
  SundayServiceLoader: {
    enable: true,
    priority: 25,
    options: {
      pattern: `app/services/**/*.(${EXTENDSION})`
    }
  }
};

export = loaderConfig;