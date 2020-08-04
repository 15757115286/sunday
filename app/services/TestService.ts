import Service from '@plugins/sunday-decorator/app/lib/service';
import { ServiceOptions } from '@plugins/sunday-decorator/definitions';
import { Context } from 'koa';

@Service('TestService')
class TestService {
    options: ServiceOptions;
    ctx: Context;
    getAge() {
      return 20 + this.ctx.url;
    }
}

export default TestService;