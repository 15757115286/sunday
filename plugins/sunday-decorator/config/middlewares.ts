import { PureObject } from '@/def/common';
import { MiddlewareConfig } from '@/def/core';

const middlewaresConfig:PureObject<MiddlewareConfig> = {
  'sunday-decorator-router': {
    enable: true,
    priority: 200,
    options: {
      defaultMethods: ['GET', 'POST'] // 如果没有表明方法，默认的允许请求
    }
  }
};

export = middlewaresConfig;