import webpackDevConfig from './webpack.config.dev';
import * as path from 'path';
import webpack = require('webpack');
import { printEnvBox } from './helper';
import WebpackDevServer = require('webpack-dev-server');

printEnvBox(path.resolve(__dirname, '../package.json'));

const compiler = webpack(webpackDevConfig);

const server = new WebpackDevServer(compiler, {
    stats: {
        colors: true,
        modules: false,
        entrypoints: false
    },
    host: 'localhost',
    port: 7009
});

server.listen(7009);
process.on('exit', () => {
    server.close();
})