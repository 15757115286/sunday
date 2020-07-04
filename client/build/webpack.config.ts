import * as path from 'path';
import * as fs from 'fs-extra';
import * as webpack from 'webpack';
import { PureObject } from '../types/common';
import SundayReflectPlugin from './SundayReflectPlugin';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

// 获取pages下面所有的文件夹，默认是一个独立的入口
import parser = require('yargs-parser');
const isDev = !parser.prod;
const args = parser(process.argv.slice(2));
const ENTRY_SPOT = path.resolve(__dirname, '../pages');
const CACHE_DIR = path.resolve(__dirname, '../../run/cache');
const MAIN_FILE = 'main.js';
const pathes = fs.readdirSync(ENTRY_SPOT, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const entry: PureObject<string> = {};
pathes.forEach(dirname => {
    entry[dirname] = path.resolve(__dirname, '../pages', dirname, MAIN_FILE);
});

const mode = isDev ? 'development' : 'production';

const plugins = [
    new CleanWebpackPlugin(),
    // 给每个模块创造不同的hash @see https://webpack.js.org/plugins/hashed-module-ids-plugin/
    new webpack.HashedModuleIdsPlugin(),
    new VueLoaderPlugin(),
    new WebpackBar(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
    })
];

if (!isDev) {
    plugins.push(
        new SundayReflectPlugin({
            output: path.resolve(__dirname, '../../run')
        })
    );
}

const webpackConfig: webpack.Configuration = {
    entry,
    mode,
    resolve: {
        extensions: ['.vue', '.js', '.ts']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js'
    },
    plugins,
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
                            hmr: mode === 'development',
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
            cacheGroups: {
                vendors: {
                    name: 'vendors'
                }
            }
        }
    }
}

export default webpackConfig;

