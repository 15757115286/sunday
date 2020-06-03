import { BaseContext } from 'koa';
import { Controller, Method, Route, Get, Post } from '../../plugins/sunday-decorator/app/lib';

@Controller('/test')
class TestController {
    name:string = 'xwt';
    @Get
    @Route('/getName')
    getName(ctx:BaseContext) {
        ctx.body = 'my name is '  + this.name;
    }

    @Route('/getAge')
    getAge(ctx:BaseContext) {
        ctx.body = 'my age is 18ss'
    }
}

export = TestController;