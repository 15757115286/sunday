import webpackBaseConfig from './webpack.config.base';
import webpackMerge = require('webpack-merge');
import webpack = require('webpack');

const webpackDevConfig: webpack.Configuration = {
    mode: 'development',
    devtool: 'cheap-module-source-map'
}

export default webpackMerge.smart(webpackBaseConfig, webpackDevConfig);