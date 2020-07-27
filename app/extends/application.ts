declare module '@/def/core' {
    interface BaseApplication {
        appName: string;
    }
}

let appName = 'appName';
export default {
  set appName(name: string) {
    appName = name;
  },

  get appName(): string {
    return appName;
  }
};