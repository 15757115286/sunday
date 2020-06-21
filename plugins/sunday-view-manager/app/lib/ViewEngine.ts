import { PureObject } from '../../../../definitions/common';
import { Context } from 'koa';
import { BaseApplication } from '../../../../definitions/core';

type ReturnType = string | Promise<string> | void;
export abstract class ViewEngine {
    ctx: Context;
    app: BaseApplication;
    root: string | string[];
    constructor (ctx: Context, app: BaseApplication, root: string | string[]){
        this.ctx = ctx;
        this.app = app;
        this.root = root;
    };
    abstract render(name: string, context?: PureObject, isAsync?: boolean): ReturnType;
    abstract renderString(str: string, context?: PureObject, isAsync?: boolean): ReturnType;
}

export interface ViewEngineConstructor {
    new (ctx: Context, app: BaseApplication, root: string | string[]):ViewEngine;
}
