import { MiddlewareItemConfig, BaseApplication } from '../../../../definitions/core';
import { Context, Next } from 'koa';
import * as fs from 'fs-extra';
import * as path from 'path';
import { getConfig, resolveUrl, easyGet } from '../lib/util';
import * as util from 'util';
import http = require('http');
import { isMatch } from '../../../../core/lib/util';
const DEFAULT_FILENAME_REG = /nunjucks\/(.+)/;

const readFile = util.promisify(fs.readFile);

const factory = function(config:MiddlewareItemConfig, app:BaseApplication) {
    const mode = app.config.mode || 'dev';
    return async function(ctx: Context, next: Next) {
        const urlPath = ctx.path;
        let redirectMatch = config.redirectMatch || [];
        if (!Array.isArray(redirectMatch)) {
            redirectMatch = [redirectMatch];
        }
        if (isMatch(urlPath, redirectMatch)) {
            const dest = resolveUrl(urlPath, config);
            ctx.body = await easyGet(dest);
            return;
        }
        const fileNameReg = config.fileNameReg || DEFAULT_FILENAME_REG;
        const match = urlPath.match(fileNameReg);
        if (match === null) {
            return await next();
        }
        const [root, js, css] = getConfig(app);
        const fileName = match![1];
        const isJs = /\.js$/.test(fileName);
        const realName = fileName.replace(/_[^_\.]+\.(js|css)$/, '.$1');
        if (mode === 'prod') {
            try {
                const reflect = fs.readJSONSync(path.resolve(root, isJs ? js : css));
                if (!reflect) {
                    await next();
                }
                const content = await readFile(reflect[realName].path);
                // 游览器当只有收到响应头为 text/css的link时才会重新渲染样式
                ctx.set('Content-Type', isJs ? 'application/javascript' : 'text/css')
                ctx.body = content;
            }catch {
                ctx.status = 404;
                ctx.body = 'Not Found';
            }
        } else {
            const dest = resolveUrl(realName, config);
            ctx.body = await easyGet(dest);
        }
    }
}

export = factory;