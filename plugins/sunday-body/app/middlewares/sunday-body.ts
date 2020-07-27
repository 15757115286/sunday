import { MiddlewareItemConfig } from '@def/core';
const bodyParser = require('koa-bodyparser');
declare module 'koa' {
    interface Request {
        body?: any;
        rawBody?: any;
    }
    interface Context {
        disableBodyParser?: boolean;
    }
}
function factory(config:MiddlewareItemConfig) {
  return bodyParser(config);
}

export default factory;