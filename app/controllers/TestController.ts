import { BaseContext } from 'koa';
import { Controller, Method, Route, Get, Post, Inject } from '../../plugins/sunday-decorator/app/lib';
import { BaseApplication } from '../../definitions/core';
import TestService from '../services/TestService';

@Controller('/test')
class TestController {
    app!: BaseApplication;
    ctx!: BaseContext;
    
    @Inject(TestService) 
    testService!: TestService;

    name:string = 'xwt';

    @Get
    @Route('/getName')
    getName() {
        this.ctx.body = 'my name is '  + this.name + this.testService.getAge();
    }

    @Route('/getAge')
    getAge() {
        this.ctx.body = 'my age is 18ss'
    }
}
export default TestController;