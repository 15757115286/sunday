declare module '../../definitions/core' {
    interface BaseApplication {
        appName: string;
    }
}

let appName: string = 'appName';
export default {
    set appName(name: string) {
        appName = name;
    },

    get appName(): string {
        return appName;
    }
}