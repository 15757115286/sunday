import * as path from 'path';
import * as fs from 'fs-extra';
import * as webpack from 'webpack';
import { PureObject } from '../types/common';
import SundayReflectPlugin from './SundayReflectPlugin';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 获取pages下面所有的文件夹，默认是一个独立的入口
import parser = require('yargs-parser');
import chalk from 'chalk';
const args = parser(process.argv.slice(2));
const isDev = !args.prod;

// 获取pages下面所有的文件夹，默认是一个独立的入口
const ENTRY_SPOT = path.resolve(__dirname, '../pages');
const CACHE_DIR = path.resolve(__dirname, '../../run/cache');
const MAIN_FILE = 'main.js';
const entry: PureObject<string> = {};
let pathes: string[] = [];
if (args.entry) {
    pathes = args.entry.split(',');
} else {
    pathes = fs.readdirSync(ENTRY_SPOT, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}
if (pathes.length === 0) {
    console.log(chalk.red('无法找到相关入口！'));
}
pathes.forEach(dirname => {
    entry[dirname] = path.resolve(__dirname, '../pages', dirname, MAIN_FILE);
});
const webpackConfig: webpack.Configuration = {
    entry,
    resolve: {
        extensions: ['.vue', '.js', '.ts']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js' ,
        chunkFilename: 'js/[name].js'
    },
    plugins: [
        new VueLoaderPlugin(),
        new WebpackBar(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
        }),
        new SundayReflectPlugin({
            output: path.resolve(__dirname, '../../run'),
            mode: isDev ? 'dev' : 'prod'
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: CACHE_DIR
                        }
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}

export default webpackConfig;

