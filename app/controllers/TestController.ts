import Application, { BaseContext, Request, Context } from 'koa';
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
    async getName() {
        this.ctx.render('cm.html' ,{
            username: 'xwt'
        });
    }

    @Post
    @Route('/getAge')
    async getAge() {
        console.log(this.ctx.request.body);
        this.ctx.body = 'my age is 18ss'
    }
}
export default TestController;