// 适应.ts中导入vue后缀的文件
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}