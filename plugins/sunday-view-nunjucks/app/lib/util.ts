import { BaseApplication } from '../../../../definitions/core';
import * as path from 'path';
import url = require('url');
import http = require('http');

function getConfig(app: BaseApplication) {
  const { nunjucks: config = {} } = app.config || {};
  const {
    reflectConfig: {
      root = path.resolve(__dirname, 'run'),
      js = 'js_version',
      css = 'css_version'
    } = {}
  } = config;
  return [root, js, css];
}

function resolveUrl(realtive, config) {
  const { hostname, port, protocol, publicPath } = config;
  // 兼容window路径
  const dest = url.format({
    hostname,
    port,
    protocol,
    pathname: path.join(publicPath, realtive).replace(/\\/g, '/')
  });
  return dest;
}

function easyGet(url):Promise<string|Buffer> {
  const promise = new Promise<string|Buffer>(resolve => {
    http.request(url, res => {
      let data = Buffer.alloc(0);
      res.on('data', d => {
        data = Buffer.concat([data, d]);
      });
      res.on('end', () => {
        resolve(data);
      });
    })
      .end();
  });
  return promise;
}

function isMatch(url: string | undefined, patterns:(string | RegExp)[]): boolean {
  if (url === undefined) {
    return false;
  }
  return patterns.some(pat => {
    if (typeof pat === 'string') {
      return pat === url;
    }
    return pat.test(url);
  });
}

export {
  getConfig,
  resolveUrl,
  easyGet,
  isMatch
};