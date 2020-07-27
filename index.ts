import Sunday from './core/Sunday';
import { registerModuleFromTsConfig } from './core/lib/util';

// 上面在未注册模块前不能使用别名
registerModuleFromTsConfig(__dirname);

// process.env.NODE_ENV = 'prod';
new Sunday({
  port: 3000,
  root: process.cwd()
});
