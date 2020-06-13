import { BaseContext, Request, Context } from 'koa';
import { Controller, Method, Route, Get, Post, Inject } from '../../plugins/sunday-decorator/app/lib';
import { BaseApplication } from '../../definitions/core';
import TestService from '../services/TestService';

@Controller('/test')
class TestController {
    app!: BaseApplication;
    ctx!: Context;
    
    @Inject(TestService) 
    testService!: TestService;

    name:string = 'xwt';

    @Get
    @Route('/getName')
    getName() {
        this.ctx.body = 'my name is '  + this.name + this.testService.getAge();
        const req = this.ctx.request;
        console.log(req.version);
        req.version = '2.0.0';
        console.log(this.ctx.hasDecorator);
    }

    @Post
    @Route('/getAge')
    getAge() {
        console.log(this.ctx.request.body);
        this.ctx.body = 'my age is 18ss'
    }
}
export default TestController;