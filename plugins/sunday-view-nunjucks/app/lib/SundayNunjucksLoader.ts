import nunjucks = require('nunjucks');

class SundayNunjucksLoader extends nunjucks.FileSystemLoader{
    constructor(searchPathes?: string | string[], noCache: boolean = true) {
        super(searchPathes, {
            noCache
        });
    }
}

export default SundayNunjucksLoader;