import { Context } from 'koa';
import { Controller, Route, Get } from '../../plugins/sunday-decorator/app/lib';
import { BaseApplication } from '../../definitions/core';

@Controller('/ui/:component')
class SundayUiController {
    app: BaseApplication;
    ctx: Context;
    
    @Get
    @Route()
    async getName() {
        this.ctx.setGlobal('title', 'sunday-ui');
        await this.ctx.render('sunday-ui.html');
    }
}
export default SundayUiController;