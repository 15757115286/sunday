import { BaseApplication } from '../../../../definitions/core';
import SundayNunjucksLoader from './SundayNunjucksLoader';
import { NunjucksConfig } from '../../definitions';
import { Context } from 'koa';
import { ViewEngine } from '../../../sunday-view-manager/app/lib/ViewEngine';
import { PureObject } from '../../../../definitions/common';
import fs from 'fs-extra';
import path from 'path';
import { getConfig } from './util';
import nunjucks = require('nunjucks');
const VIEW_ENGINE_NAME = 'nunjucks';
// 坑，init会覆盖Environment中的init
const INIT = Symbol('init');

class SundayNunjucks extends ViewEngine {
    viewEngine: nunjucks.Environment;
    constructor(ctx: Context, app: BaseApplication, _root: string | string[]) {
      super(ctx, app, _root);
      const config = app.config;
      const nunjucksConfig: NunjucksConfig = config[VIEW_ENGINE_NAME] || {};
      const { root = _root, options = {} } = nunjucksConfig;
      const loader = new SundayNunjucksLoader(root, options.noCache);
      this.viewEngine = new nunjucks.Environment(loader, options);
      this[INIT]();
    }

    [INIT]() {
      const mode = this.app.config.mode;
      const viewEngine = this.viewEngine;
      const _global = this.ctx._global || {};
      viewEngine.addGlobal('_global', JSON.stringify(_global));
      viewEngine.addGlobal('loadJs', this.loadJs.bind(this));
      viewEngine.addGlobal('loadCss', this.loadCss.bind(this));
      viewEngine.addGlobal('prod', mode === 'prod');
      viewEngine.addGlobal('getTitle', () => {
        return _global.title || 'sunday';
      });
    }

    render(name: string, context?: PureObject, isAsync = false): string | Promise<string> {
      if (isAsync) {
        return new Promise<string>((resolve, reject) => {
          this.viewEngine.render(name, context, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result || '');
            }
          });
        });
      }
      return this.viewEngine.render(name, context);
    }

    renderString(str: string, context: PureObject, isAsync = true): string | Promise<string> {
      if (isAsync) {
        return new Promise<string>((resolve, reject) => {
          this.viewEngine.render(str, context, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result || '');
            }
          });
        });
      }
      return this.viewEngine.render(str, context);
    }

    loadCss(fileName: string, isInline = false) {
      try {
        const [root, , css] = getConfig(this.app);
        const abs = path.resolve(root, css);
        const isExistReflectJson = fs.existsSync(abs);
        if (!isExistReflectJson) {
          throw new Error(`file ${css} is not exists`);
        }
        const reflect = fs.readJSONSync(abs);
        const reflectFile = reflect[fileName];
        if (reflectFile === undefined) {
          return '';
        }
        if (isInline) {
          const content = fs.readFileSync(reflectFile.path);
          return `
                <style>
                    ${content}
                </style>
            `.trim();
        } else {
          let fileName = reflectFile.fileName;
          if (fileName === undefined) return '';
          if (!/^\//.test(fileName)) {
            fileName = '/' + fileName;
          }
          const href = '/' + VIEW_ENGINE_NAME + fileName;
          return `
                <link rel="stylesheet" type="text/css" href="${href}" />
            `.trim();
        }
      } catch (e) {
        console.error(e);
        return '';
      }
    }

    loadJs(fileName: string, isInline = false, isAsync = false) {
      try {
        const [root, js] = getConfig(this.app);
        const abs = path.resolve(root, js);
        const isExistReflectJson = fs.existsSync(abs);
        if (!isExistReflectJson) {
          throw new Error(`file ${js} is not exists`);
        }
        const reflect = fs.readJSONSync(abs);
        const reflectFile = reflect[fileName];
        if (reflectFile === undefined) {
          return '';
        }
        if (isInline) {
          const content = fs.readFileSync(reflectFile.path);
          return `
                <script>
                    ${content}
                </script>
            `.trim();
        } else {
          let fileName = reflectFile.fileName;
          if (fileName === undefined) return '';
          if (!/^\//.test(fileName)) {
            fileName = '/' + fileName;
          }
          const src = '/' + VIEW_ENGINE_NAME + fileName;
          return `
                <script src="${src}" ${isAsync ? 'async' : ''}></script>
            `.trim();
        }
      } catch (e) {
        console.error(e);
        return '';
      }
    }
}

export default SundayNunjucks;