import { Context } from 'koa';
import { Controller, Route, Get, Post, Inject } from '../../plugins/sunday-decorator/app/lib';
import { BaseApplication } from '../../definitions/core';
import TestService from '../services/TestService';
import 'reflect-metadata';


@Controller('/test')
class TestController {
    app: BaseApplication;
    ctx: Context;
    
    @Inject
    testService: TestService;

    name:string = 'xwt';

    @Get
    @Route('/getName')
    async getName() {
        this.ctx.setGlobal('name', [1,2,3,4]);
        this.ctx.setGlobal('title', '曹敏周日');
        await this.ctx.render('cm.html' ,{
            username: this.testService.getAge()
        });
    }

    @Post
    @Route('/getAge')
    async getAge() {
        console.log(this.ctx.request.body);
        this.ctx.body = 'my age is 18ss';
    }
}
export default TestController;