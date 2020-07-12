let version = '1.0.0';
declare module 'koa' {
    interface Request {
        version:string;
    }
}
export default {
  set version (v: string) {
    console.log('set version');
    version = v;
  },

  get version () {
    return version;
  }
};