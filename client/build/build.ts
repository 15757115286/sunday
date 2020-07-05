import webpackProdConfig from './webpack.config.prod';
import * as path from 'path';
import webpack = require('webpack');
import { printEnvBox } from './helper';

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

const compiler = webpack(webpackProdConfig);
compiler.run(callback);