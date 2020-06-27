import { BaseApplication } from '../../../../definitions/core';
import * as path from 'path';

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

export {
    getConfig
}