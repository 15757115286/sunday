import path = require('path');

export default {
    'nunjucks': {
        root: [
            path.resolve(__dirname, '../app/views')
        ],
        options: {
            autoescape: false,
            noCache: true
        }
    }
}