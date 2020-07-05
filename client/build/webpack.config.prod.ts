import webpackBaseConfig from './webpack.config.base';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');
import SundayReflectPlugin from './SundayReflectPlugin';
import path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins: webpack.Plugin[] = [
    new CleanWebpackPlugin(),
    // 给每个模块创造不同的hash @see https://webpack.js.org/plugins/hashed-module-ids-plugin/
    new webpack.HashedModuleIdsPlugin(),
    new SundayReflectPlugin({
        output: path.resolve(__dirname, '../../run')
    })
];

const webpackProdConfig: webpack.Configuration = {
    mode: 'production',
    plugins
}

export default webpackMerge(webpackBaseConfig, webpackProdConfig);