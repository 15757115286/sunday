import * as fs from'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { PureObject } from '../types/common';
const boxen = require('boxen');

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
        borderStyle: 'round'
    }));
}

export {
    outputJSON,
    printEnvBox
}