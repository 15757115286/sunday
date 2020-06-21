import SundayViewManager from '../app/lib/SundayViewManager';
import { StringLike, PureObject } from '../../../definitions/common';

declare module '../../../definitions/core' {
    interface BaseApplication {
        view: SundayViewManager;
    }
}

declare module 'koa' {
    interface Context {
        render(name: string, context?: PureObject, isAsync?: boolean): Promise<string>;
        renderString(name: string, context?: PureObject, isAsync?: boolean, engineName?: string): Promise<string>;
        setGlobal(name: string, value:any): void;
        getGlobal(name?: string): any;
        _global?: PureObject<any>;
    }
}

export interface ViewManagerConfig {
    root?: string | string[];
    mapping?: PureObject<string>;
    default?: string;
}