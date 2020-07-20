import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs-extra';

interface SundayReflectPluginOption {
    delimitor?: string;
    prefix?: string | string[]
    output?: string;
    mode?: string;
}

class SundayReflectPlugin {
    delimitor!: string;
    refReg!: RegExp;
    output: string = path.resolve(process.cwd(), 'run');
    mode = 'dev';
    constructor(option: SundayReflectPluginOption = {}) {
      let { delimitor = '_', prefix = ['css', 'js'], output, mode } = option;
      if (delimitor) {
        this.delimitor = delimitor;
      }
      if (prefix && !Array.isArray(prefix)) {
        prefix = [prefix];
      }
      if (output) {
        this.output = output;
      }
      const regString = `^(${(<string[]>prefix).join('|')})\\/([^${delimitor}]+)(?:${delimitor}.+)?\\.(.+)`;
      this.refReg = new RegExp(regString);
      this.mode = mode || this.mode;
    }

    apply(compiler: webpack.Compiler) {
      const chunksHash = Object.create(null);
      compiler.hooks.compilation.tap('SundayReflectPlugin', compilation => {
        compilation.hooks.chunkAsset.tap('SundayReflectPlugin', (chunk, filename) => {
          chunksHash[filename] = chunk.hash;
        });
      });
      compiler.hooks.afterEmit.tap('SundayReflectPlugin', compilation => {
        const { assets } = compilation;
        const result = {};
        for (const key in assets) {
          const match = key.match(this.refReg);
          if (!match) {
            continue;
          }
          const [fileName, prefix, reflectName, suffix] = match;
          const asset = assets[key];
          const set = result[prefix] || (result[prefix] = {});
          set[`${prefix}/${reflectName}.${suffix}`] = {
            fileName,
            path: asset.existsAt
          };
        }
        for (const pre in result) {
          fs.outputJsonSync(path.join(this.output, `${pre}_version.json`), result[pre], {
            spaces: 2
          });
        }
      });
      if (this.mode === 'prod') {
        compiler.hooks.emit.tap('SundayReflectPlugin', compilation => {
          const { assets } = compilation;
          const _assets = {};
          for (const key in assets) {
            const assetHash = chunksHash[key];
            if (assetHash) {
              const newKey = key.replace(/(\.[^.]+)$/, `_${assetHash}$1`);
              _assets[newKey] = assets[key];
            }
          }
          compilation.assets = _assets;
        });
      }
    }
}

export default SundayReflectPlugin;
