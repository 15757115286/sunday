import webpackBaseConfig from './webpack.config.base';
import BaseScriptPlugin from './BaseScriptPlugin';
import webpackMerge = require('webpack-merge');
import webpack = require('webpack');

const webpackDevConfig: webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BaseScriptPlugin({
      scripts: ['base.js']
    })
  ],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      minChunks: 1,
      name: 'vendors'
    }
  }
};

export default webpackMerge.smart(webpackBaseConfig, webpackDevConfig);
