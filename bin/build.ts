import * as fs from 'fs-extra';
import * as chalk from 'chalk';
import * as path from 'path';
import * as cp from 'child_process';
import { BorderStyle } from 'boxen';
const ora = require('ora');
const boxen = require('boxen');

function getRealPath(...relativePath: string[]) {
    return path.resolve(__dirname, ...relativePath);
}

const version = require(getRealPath('../package.json')).version;
const mode = process.env.NODE_ENV || 'dev';
const info = [
    chalk.bold.green('Sunday') + ' ' + version, 
    'Running in ' + chalk.bold.green(mode) + ' mode'
];
console.log(boxen(info.join('\n'), {
    padding: 1,
    borderColor: 'green',
    borderStyle: BorderStyle.Round
}));
console.log();

const spinner = ora(chalk.green('开始进行ts编译打包'));
const { spawn } = cp;
const PROD_CONFIG_NAME = 'tsconfig.prod.json';

function copy() {
    spinner.start(chalk.blue('开始拷贝静态资源'));
    return fs.copy(getRealPath('../app/views'), getRealPath('../dist/app/views'))
        .then(() => spinner.succeed(chalk.green('静态资源拷贝成功')))
        .catch(err => spinner.fail(chalk.red(err)))
}

spinner.start();
const ls = spawn('tsc', ['-p', PROD_CONFIG_NAME]);

ls.stderr.on('data', err => {
    spinner.fail(chalk.red(err));
});

ls.on('close', () => {
    spinner.succeed(chalk.green('ts编译打包成功'));
    copy().finally(() => {
        spinner.succeed(chalk.green('项目打包结束'))
    });
});







