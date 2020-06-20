import path = require('path');

export default {
    'sunday-nunjucks': {
        root: path.resolve(__dirname, '../app/views'),
        options: {
            autoescape: true,
            noCache: true
        }
    }
}