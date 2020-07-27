import { Context } from 'koa';
import { Controller, Route, Get } from '@plugins/sunday-decorator/app/lib';
import { BaseApplication } from '@def/core';
@Controller('/ui')
class SundayUiController {
    app: BaseApplication;
    ctx: Context;

    @Get
    @Route('/:component*')
    async getComponent() {
      this.ctx.setGlobal('title', 'sunday-ui');
      await this.ctx.render('sunday-ui.html');
    }
}
export default SundayUiController;