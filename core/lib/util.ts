import * as path from 'path';
import { PureObject } from '../../definitions/common';
import { CoreEntry } from '../../definitions/core';
const fs = require('fs-extra');
const _merge = require('merge');

const merge = _merge.recursive;

function getPluginPath(baseConfigPath: string, pluginNameÏ: string): string {
    if (!baseConfigPath || !pluginNameÏ) return '';
    return path.resolve(baseConfigPath, '../plugins', pluginNameÏ);
}

function outputJSON(path: string, object: PureObject, options: PureObject = {}): void {
    fs.outputJsonSync(path, object, merge({
        spaces: 2
    }, options));
}

function isCoreEntry(path: string | CoreEntry): path is CoreEntry {
    return typeof path !== 'string';
}

function isFunction(fn: any): boolean{
    return Object.prototype.toString.call(fn) === '[object Function]';
}

export {
    merge,
    outputJSON,
    getPluginPath,
    isCoreEntry,
    isFunction
}