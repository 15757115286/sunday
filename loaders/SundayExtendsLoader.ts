import Loader from '../core/Loader';
import { isPlainObject } from '../core/lib/util';
import { PureObject } from '../definitions/common';
import chalk from 'chalk';
const BASE_PATH = 'koa/lib';
const VALID_FILENAME_REG = /^request|response|application|context$/;

class SundayExtendsLoader extends Loader {
    load() {
        let pattern = this.config.pattern;
        if (!pattern) return;
        pattern = Array.isArray(pattern) ? pattern : [pattern];
        pattern.forEach(pat => {
            this.getGlobalEntry(pat, entries => {
                entries.forEach(entry => {
                    const fileName = this.resolvePathName(entry);
                    if (!VALID_FILENAME_REG.test(fileName)) return;
                    const _currentObj:any = require(entry);
                    const currentObj:PureObject = _currentObj.default || _currentObj
                    if (!isPlainObject(currentObj)) return;
                    const mergedObj:PureObject = require(`${BASE_PATH}/${fileName}`);
                    this.merge(mergedObj, currentObj, entry);
                });
            });
        });
    }

    merge(merged:PureObject, current:PureObject, entry:string) {
        const descriptors = Object.getOwnPropertyDescriptors(current);
        for (let key in descriptors) {
            if (Object.prototype.hasOwnProperty.call(merged, key)) {
                const fileName = this.resolvePathName(entry);
                console.log(chalk.yellow(
                    `${entry}: ${key} has exsist in ${fileName} ` + 
                    `and it will replace the old one!`));
            }
            Object.defineProperty(merged, key, descriptors[key]);
        }
    }
}

export = SundayExtendsLoader;