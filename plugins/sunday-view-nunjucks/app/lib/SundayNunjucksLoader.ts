import nunjucks = require('nunjucks');

class SundayNunjucksLoader extends nunjucks.FileSystemLoader {
  constructor(searchPathes?: string | string[], noCache = true) {
    super(searchPathes, {
      noCache
    });
  }
}

export default SundayNunjucksLoader;