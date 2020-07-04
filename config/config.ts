import path = require('path');

export default {
    'mode': 'prod',
    'nunjucks': {
        root: [
            path.resolve(__dirname, '../app/views')
        ],
        options: {
            autoescape: false,
            noCache: true
        },
        reflectConfig: {
            root: path.resolve(__dirname, '../run'),
            js: 'js_version.json',
            css: 'css_version.json'
        }
    }
}