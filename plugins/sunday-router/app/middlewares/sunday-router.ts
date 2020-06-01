import { WrappedMiddleware, Middleware } from "../../../../definitions/core";

const factory: WrappedMiddleware = function (config = {}, app): Middleware {
    return async function (ctx, next) {
        ctx.body = config.name;
        await next();
    }
}

export = factory;