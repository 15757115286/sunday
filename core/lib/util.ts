import * as path from 'path';
import { PureObject, StringLike } from '../../definitions/common';
import { CoreEntry, MergeFunction } from '../../definitions/core';
const fs = require('fs-extra');
const _merge = require('merge');

const merge: MergeFunction = _merge.recursive;

function getPluginPath (baseConfigPath: string, pluginNameÏ: string): string {
  if (!baseConfigPath || !pluginNameÏ) return '';
  return path.resolve(baseConfigPath, '../plugins', pluginNameÏ);
}

function outputJSON (path: string, object: PureObject, options: PureObject = {}): void {
  fs.outputJsonSync(path, object, merge({
    spaces: 2,
    replacer (key: string, value: any) {
      if (value instanceof RegExp) {
        return `RegExp->  ${value.toString()}`;
      }
      return value;
    }
  }, options));
}

function isCoreEntry (path: string | CoreEntry): path is CoreEntry {
  return typeof path !== 'string';
}

function isFunction (fn: any): boolean {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

function isPlainObject (obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isExtendsFrom (son:any, parent:any):boolean {
  if (!isFunction(son) || !isFunction(parent)) return false;
  return parent.isPrototypeOf(son);
}

function isMatch (path: string, patterns: StringLike | StringLike[]): boolean {
  if (!path) return false;
  if (!patterns) return true;
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }
  const isMatch = patterns.some(pattern => {
    if (typeof pattern === 'string') {
      return path === pattern;
    } else if (pattern instanceof RegExp) {
      return pattern.test(path);
    } else {
      return false;
    }
  });
  return isMatch;
}

export {
  merge,
  outputJSON,
  getPluginPath,
  isCoreEntry,
  isFunction,
  isPlainObject,
  isExtendsFrom,
  isMatch
};