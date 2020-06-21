import { BaseApplication } from '../../definitions/core';
import SundayNunjucks from './app/lib/SundayNunjucks';


export default function bootstrap(app: BaseApplication) {
    app.view.use('nunjucks', SundayNunjucks);
}