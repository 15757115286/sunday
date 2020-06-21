import nunjucks = require('nunjucks');
import { BaseApplication } from '../../../../definitions/core';
import SundayNunjucksLoader from './SundayNunjucksLoader';
import { NunjucksConfig } from '../../definitions';
import { Context } from 'koa';
import { ViewEngine } from '../../../sunday-view-manager/app/lib/ViewEngine';
import { PureObject } from '../../../../definitions/common';
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
        const viewEngine = this.viewEngine;
        const _global = this.ctx._global || {};
        viewEngine.addGlobal('_global', JSON.stringify(_global));
        viewEngine.addGlobal('getTitle', () => {
            return _global.title || 'sunday';
        });
    }

    render(name: string, context?: PureObject, isAsync:boolean = false):string | Promise<string> {
        if(isAsync) {
            return new Promise<string>((resolve, reject) => {
                this.viewEngine.render(name, context, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result || '');
                    }
                });
            }) ;
        }
        return this.viewEngine.render(name, context); 
    }

    renderString(str: string, context: PureObject, isAsync = false):string | Promise<string> {
        if(isAsync) {
            return new Promise<string>((resolve, reject) => {
                this.viewEngine.render(str, context, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result || '');
                    }
                });
            }) ;
        }
        return this.viewEngine.render(str, context);  
    }    
    
}

export default SundayNunjucks;