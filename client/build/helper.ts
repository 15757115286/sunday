import { BorderStyle } from 'boxen';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { PureObject } from '../types/common';
import webpack = require('webpack');
import boxen = require('boxen');

const ROOT_PATH = path.resolve(__dirname, '../../run');

function outputJSON(fileName: string, obj: PureObject) {
  fs.outputJSON(path.join(ROOT_PATH, fileName), obj, {
    spaces: 4
  });
}

function printEnvBox(pkgPath) {
  const { version, name } = require(pkgPath);
  const mode = process.env.NODE_ENV || 'dev';
  const info = [
    chalk.bold.green(name) + ' ' + version,
    'Running in ' + chalk.bold.green(mode) + ' mode'
  ];
  console.log(boxen(info.join('\n'), {
    padding: 1,
    borderColor: 'green',
    borderStyle: BorderStyle.Round
  }));
}

async function getDevServerContentConfig(entry: webpack.Configuration['entry'], root = 'assets') {
  entry = await entry;
  let result: string[];
  if (Array.isArray(entry)) {
    result = [entry.pop() as string]; // 如果是数组，我们默认最后一个是项目入口
  } else if (entry && typeof entry === 'object') {
    result = Object.values(entry).map(path => {
      if (typeof path === 'string') {
        return path;
      }
      return path.pop();
    }) as string[];
  } else {
    result = [entry as string];
  }
  const contentBase: string[] = [];
  const contentBasePath: string[] = [];
  root = root.replace(/^\//, '');
  result.forEach(path => {
    const chunks = path.split(/\/|\\/);
    chunks.pop();
    const basePath = chunks[chunks.length - 1];
    chunks.push(root);
    contentBase.push(chunks.join('/'));
    contentBasePath.push(`/${basePath}/${root}`);
  });
  return [contentBase, contentBasePath];
}

export {
  outputJSON,
  printEnvBox,
  getDevServerContentConfig
};
