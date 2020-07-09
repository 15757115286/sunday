import { MiddlewareItemConfig, BaseApplication } from '../../../../definitions/core';
import { Context, Next } from 'koa';
import * as fs from 'fs-extra';
import * as path from 'path';
import { getConfig, resolveUrl, easyGet } from '../lib/util';
import * as util from 'util';
import http = require('http');
import { isMatch } from '../../../../core/lib/util';
const mime = require('mime');
const DEFAULT_FILENAME_REG = /nunjucks\/(.+)|(?:js|css)\/sunday-chunks/;

const readFile = util.promisify(fs.readFile);

const factory = function(config:MiddlewareItemConfig, app:BaseApplication) {
    const mode = app.config.mode || 'dev';
    return async function(ctx: Context, next: Next) {
        const urlPath = ctx.path;
        const emptyReg = config.emptyReg;
        if (emptyReg && emptyReg.test(urlPath)) {
            return ctx.body = '';
        }
        let redirectMatch = config.redirectMatch || [];
        if (!Array.isArray(redirectMatch)) {
            redirectMatch = [redirectMatch];
        }
        if (isMatch(urlPath, redirectMatch)) {
            const dest = resolveUrl(urlPath, config);
            const contentType = mime.getType(urlPath);
            ctx.body = await easyGet(dest);
            ctx.set('Content-Type', contentType);
            return;
        }
        const fileNameReg = config.fileNameReg || DEFAULT_FILENAME_REG;
        const match = urlPath.match(fileNameReg);
        if (match === null) {
            return await next();
        }
        const [root, js, css] = getConfig(app);
        const fileName = match[1] || match.input!;
        const isJs = /\.js$/.test(fileName);
        const realName = fileName.replace(/_[^_\.]+\.(js|css)$/, '.$1').replace(/^\//, '');
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