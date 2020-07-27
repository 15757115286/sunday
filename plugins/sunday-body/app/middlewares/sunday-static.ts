import { MiddlewareItemConfig, BaseApplication } from '@/def/core';
import compose = require('koa-compose');
import path = require('path');
const serve = require('koa-static');

function factory(config:MiddlewareItemConfig, app:BaseApplication) {
  let { root, options } = config;
  if (!root) {
    root = ['static'];
  }
  if (!Array.isArray(root)) {
    root = [root];
  }
  const basePath = app.options.root;
  return compose(root.map((r: string) => serve(path.join(basePath, r), options)));
}

export default factory;