import type webpack from 'webpack';
import * as path from 'path';
export interface BaseScriptOption {
    scripts?: string | string[];
    include?: RegExp;
    exclude?: RegExp;
}

class BaseScriptPlugin {
  scripts!:string[];
  include?: RegExp;
  exclude?: RegExp;
  isInitial = false;
  constructor(option: BaseScriptOption = {}) {
    let { scripts = [], include, exclude } = option;
    if (typeof scripts === 'string') {
      scripts = [scripts];
    }
    this.scripts = scripts;
    this.include = include;
    this.exclude = exclude;
  }

  apply(compiler: webpack.Compiler) {
    const entry = compiler.options.entry;
    const context = compiler.context;
    this.scripts = this.scripts.map(script => {
      // window和unix的绝对路径
      if (/^(\/|\w:)/.test(script)) {
        return script;
      }
      return path.resolve(context, script);
    });
    if (entry === undefined) {
      throw new Error('BaseScriptPlugin need an entry of webpack config!');
    }
    compiler.options.entry = this.wrapEntry(entry);
  }

  wrapEntry(entry: webpack.Configuration['entry']) {
    const result = {};
    return async():Promise<webpack.Entry> => {
      if (this.isInitial) {
        return result;
      }
      this.isInitial = true;
      if (typeof entry === 'function') {
        entry = await entry();
      }
      if (typeof entry === 'string') {
        entry = {
          main: [entry]
        };
      }
      if (Array.isArray(entry)) {
        entry = {
          main: entry
        };
      }
      Object.keys(entry as webpack.Entry).forEach(key => {
        const oldValue = entry![key];
        const value = typeof oldValue === 'string' ? [oldValue] : oldValue;
        result[key] = this.addScript(key, value);
      });
      return result;
    };
  }

  addScript(point:string, value: string[]) {
    const { include, exclude, scripts } = this;
    if (exclude && exclude.test(point)) {
      return value;
    }
    if (include && include.test(point)) {
      return [...scripts, ...value];
    }
    if (include === undefined && exclude === undefined) {
      return [...scripts, ...value];
    }
    return value;
  }
}

export default BaseScriptPlugin;