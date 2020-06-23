import * as fs from 'fs-extra';
import * as chalk from 'chalk';
import * as path from 'path';

function getRealPath(...relativePath: string[]) {
    return path.resolve(__dirname, ...relativePath);
}

console.log(chalk.green('开始拷贝静态资源'));
fs.copySync(getRealPath('../app/views'), getRealPath('../dist/app/views'));
console.log(chalk.green('项目打包结束'));





