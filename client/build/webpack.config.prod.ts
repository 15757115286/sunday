import webpackBaseConfig from './webpack.config.base';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins: webpack.Plugin[] = [
  new CleanWebpackPlugin(),
  // 给每个模块创造不同的hash @see https://webpack.js.org/plugins/hashed-module-ids-plugin/
  new webpack.HashedModuleIdsPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[name].css'
  })
];

const webpackProdConfig: webpack.Configuration = {
  mode: 'production',
  plugins,
  optimization: {
    // 这个为了兼容异步组件打包。这个后续有很大的优化空间
    // @see https://webpack.js.org/plugins/mini-css-extract-plugin/
    // @see https://webpack.js.org/plugins/split-chunks-plugin/
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
};

export default webpackMerge(webpackBaseConfig, webpackProdConfig);
