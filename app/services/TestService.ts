import Service from "../../plugins/sunday-decorator/app/lib/service";
import { ServiceOptions } from '../../plugins/sunday-decorator/definitions';
import { BaseContext } from 'koa';

@Service('TestService')
class TestService {
    options: ServiceOptions;
    ctx: BaseContext;
    getAge() {
        return 20 + this.ctx.url;
    }
}

export default TestService;