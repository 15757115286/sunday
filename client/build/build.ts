import { default as config } from './webpack.config';
import * as path from 'path';
import webpack = require('webpack');
import { printEnvBox } from './helper';
import WebpackDevServer = require('webpack-dev-server');

printEnvBox(path.resolve(__dirname, '../package.json'));
const callback = (err, stats) => { // Stats Object
    if (err || stats.hasErrors()) {
        console.error(err || stats.toString({
            // Add console colors
            colors: true
        }));
    }
    // Done processing
}

const compiler = webpack(config);

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