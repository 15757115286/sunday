import { PureObject } from "../../../../definitions/common";
import { ConfigureOptions, TemplateCallback } from 'nunjucks';

declare module 'koa' {
    interface Context {
        render: (name: string, context?: PureObject, callback?: TemplateCallback<string>) => void;
        renderString: (str: string, context?: PureObject, callback?: TemplateCallback<string>) => void;
    }
}

export interface NunjucksConfig {
    root?: string;
    options?: ConfigureOptions
}