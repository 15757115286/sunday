import { NunjucksConfig } from './app/definitions';
import { configNunjucks } from './nunjucks';

const VIEW_PATH = '/app/views';

export default function bootstrap(config: NunjucksConfig) {
    configNunjucks(config.root || VIEW_PATH, config.options);
}