import webpackBaseConfig from './webpack.config.base';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins: webpack.Plugin[] = [
    new CleanWebpackPlugin(),
    // 给每个模块创造不同的hash @see https://webpack.js.org/plugins/hashed-module-ids-plugin/
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
    })
];

const webpackProdConfig: webpack.Configuration = {
    mode: 'production',
    plugins,
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

export default webpackMerge(webpackBaseConfig, webpackProdConfig);