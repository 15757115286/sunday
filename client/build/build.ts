import webpackProdConfig from './webpack.config.prod';
import * as path from 'path';
import webpack = require('webpack');
import { printEnvBox, getDevServerContentConfig } from './helper';
import CopyPlugin = require('copy-webpack-plugin');

async function start() {
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
    const [contentBase] = await getDevServerContentConfig(webpackProdConfig.entry);
    const copyPatterns = contentBase.map(pat => {
        return {
            from: path.resolve(pat, '**/*'),
            transformPath: t => t.replace('pages/', '/')
        }
    });
    console.log(copyPatterns);
    webpackProdConfig.plugins!.push(new CopyPlugin(copyPatterns));
    const compiler = webpack(webpackProdConfig);
    compiler.run(callback);
}

start();