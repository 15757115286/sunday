import { MiddlewareItemConfig, BaseApplication } from '../../../../definitions/core';
import { Context, Next } from 'koa';
import * as fs from 'fs-extra';
import * as chalk from 'chalk';
import * as WebSocket from 'ws';
import path = require('path');
const chokidar = require('chokidar');
const cheerio = require('cheerio');

let globalServer: WebSocket.Server | null = null;
const socketList: WebSocket[] = [];

const DEFAULT_PATH = 'static';
const DEFAULT_WATCH_PATH = 'static';
const DEFAULT_MONITOR_PATH = 'monitor';

function factory (config: MiddlewareItemConfig, app: BaseApplication) {
  const basePath = app.options.root;
  const port: number = config.port || 4000;
  let watchPaths: string | string[] = config.watch || DEFAULT_WATCH_PATH;
  const socketPath: string = config.socketPath || DEFAULT_MONITOR_PATH;
  if (!Array.isArray(watchPaths)) {
    watchPaths = [watchPaths];
  }
  watch(watchPaths.map(p => path.join(basePath, p)));
  startWebSocket(port, app, socketPath);
  let relativePath: string | string[] = config.root || DEFAULT_PATH;
  return async function (ctx: Context, next: Next) {
    const _path = ctx.path;
    if (/\.html$/.test(_path)) {
      let destination = '';
      let has = false;
      if (!Array.isArray(relativePath)) {
        relativePath = [relativePath];
      }
      for (const rp of relativePath) {
        const temp = path.join(basePath, rp, _path);
        has = fs.existsSync(temp);
        if (has) {
          destination = temp;
          break;
        }
      }
      if (!has) {
        return await next();
      }
      const html = fs.readFileSync(destination, 'utf8');
      const $ = cheerio.load(html);
      $('body').append(getDynamicScript(port, socketPath));
      ctx.body = $.html();
    } else {
      await next();
    }
  };
}
/**
 * TODO
 * 1. 只有自己被修改的时候才触发刷新
 * 2. 根据path监听动态生成的文件，内容可配置
 *
 * @param port 服务端监听端口
 * @param path 服务端监听路径
 */
function getDynamicScript (port:number, path: string): string {
  const script = `
    <script>
        (function(){
            const socket = new WebSocket('ws://localhost:${port}/${path.replace(/^\//, '')}');
            // Connection opened
            socket.addEventListener('open', function (event) {
                console.log('[HMR]已经和服务器建立连结，文件变更将自动刷新！')
            });

            // Listen for messages
            socket.addEventListener('message', function (event) {
                const data = event.data;
                if (data === 'refresh') {
                    window.location.reload();
                }
            });
            socket.addEventListener('close', function () {
                console.log('socket连结关闭！');
            });
        })();
    </script>
   `;
  return script;
}

// 监听文件变化
function watch (paths: string[]) {
  const watcher = chokidar.watch(paths, {
    ignoreInitial: true
  });
  watcher.on('all', (event: any, path: any) => {
    console.log(chalk.blue(`监听到文件【${path}】发生变化!`));
    socketList.forEach(socket => {
      socket.send('refresh');
    });
  });
  console.log(chalk.blue('文件自动监听服务已经启动，监听列表：'));
  paths.forEach(path => {
    console.log(chalk.blue(path));
  });
}

// 启动socket服务
function startWebSocket (port: number, app: BaseApplication, socketPath: string): void {
  app.on('close', () => {
    chalk.blue('监听到http服务关闭，同时也将关闭socket服务');
    if (globalServer) globalServer.close();
    socketList.length = 0;
    globalServer = null;
  });
  const ws = globalServer = new WebSocket.Server({
    port,
    path: socketPath
  });
  ws.on('connection', socket => {
    socketList.push(socket);
    socket.on('close', () => {
      socketList.splice(socketList.indexOf(socket), 1);
    });
  });
  console.log(chalk.blue('热更新服务已经启动，文件监听端口：' + port + '\n'));
}

export default factory;