import webpackDevConfig from './webpack.config.dev';
import * as path from 'path';
import webpack = require('webpack');
import { printEnvBox, getDevServerContentConfig } from './helper';
import WebpackDevServer = require('webpack-dev-server');

// 所有的静态资源都需要/<pkg>/assets/xxx.png去引用
async function start() {
    printEnvBox(path.resolve(__dirname, '../package.json'));
    const [contentBase, contentBasePublicPath] = await getDevServerContentConfig(webpackDevConfig.entry, 'assets');
    const compiler = webpack(webpackDevConfig);
    const server = new WebpackDevServer(compiler, {
        stats: {
            colors: true,
            modules: false,
            entrypoints: false
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        host: 'localhost',
        port: 7009,
        hot: false,
        clientLogLevel: 'silent',
        contentBase,
        contentBasePublicPath
    });

    server.listen(7009);
    process.on('exit', () => {
        server.close();
    })
}

start();