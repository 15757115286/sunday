declare module 'koa' {
    interface Context {
        hasDecorator: boolean
    }
}
export default {
    hasDecorator: true
}