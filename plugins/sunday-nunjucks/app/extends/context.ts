import { PureObject } from "../../../../definitions/common";
import { Context } from 'koa';
import { getInstance } from '../../nunjucks';
import { TemplateCallback } from 'nunjucks';

const context: PureObject = {
    render(this:Context, name: string, context?: PureObject, callback?: TemplateCallback<string>) {
        const instance = getInstance();
        this.body = instance.render(name, context, callback)
    },

    renderString(this:Context, str: string, context: PureObject, callback?: TemplateCallback<string>) {
        const instance = getInstance();
        this.body = instance.renderString(str, context, callback);
    }
}

export default context;