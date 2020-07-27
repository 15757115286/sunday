import path from 'path';
import chalk from 'chalk';
import { PureObject, StringLike } from '@def/common';
import { CoreEntry, MergeFunction } from '@def/core';
import moduleAlias from 'module-alias';
import fs from 'fs-extra';
import _merge from 'merge';

const merge: MergeFunction = _merge.recursive;

function getPluginPath(baseConfigPath: string, pluginNameÏ: string): string {
  if (!baseConfigPath || !pluginNameÏ) return '';
  return path.resolve(baseConfigPath, '../plugins', pluginNameÏ);
}

function outputJSON(path: string, object: PureObject, options: PureObject = {}): void {
  fs.outputJsonSync(path, object, merge({
    spaces: 2,
    replacer(key: string, value: any) {
      if (value instanceof RegExp) {
        return `RegExp->  ${value.toString()}`;
      }
      return value;
    }
  }, options));
}

function isCoreEntry(path: string | CoreEntry): path is CoreEntry {
  return typeof path !== 'string';
}

function isFunction(fn: any): boolean {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

function isPlainObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isExtendsFrom(son:any, parent:any):boolean {
  if (!isFunction(son) || !isFunction(parent)) return false;
  return parent.isPrototypeOf(son);
}

function isMatch(path: string, patterns: StringLike | StringLike[]): boolean {
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

function registerModuleFromTsConfig(dist: string):void {
  try {
    const config = findTsConfig();
    if (config === null) {
      return;
    }
    const paths = config?.compilerOptions?.paths;
    const wildcardReg = /\*.+/;
    if (!paths) return;
    const modules = {};
    for (const _path in paths) {
      const array:string[] = paths[_path];
      if (array.length !== 1) {
        throw new RangeError('tsconfig中paths的每项只能拥有一个值！');
      }
      const value = array[0];
      if (wildcardReg.test(_path) || wildcardReg.test(value)) {
        throw new RangeError('paths中如果有通配符，只能出现在最后一位！');
      }
      modules[_path.replace(/\/\*|\/|\*/, '')] = path.resolve(dist, value.replace(/\/\*|\/|\*/, ''));
    }
    moduleAlias.addAliases(modules);
  } catch (e) {
    console.log(chalk.red(e.message));
  }
}

function findTsConfig() {
  const fileName = 'tsconfig.json';
  const current = process.cwd();
  const paths = current.split(/\/|\\/);
  while (paths.length) {
    const _path = paths.join('/');
    const resolvePath = path.resolve(_path, fileName);
    if (fs.existsSync(resolvePath)) {
      return fs.readJSONSync(resolvePath);
    }
    paths.pop();
  }
  return null;
}

export {
  merge,
  outputJSON,
  getPluginPath,
  isCoreEntry,
  isFunction,
  isPlainObject,
  isExtendsFrom,
  isMatch,
  registerModuleFromTsConfig
};