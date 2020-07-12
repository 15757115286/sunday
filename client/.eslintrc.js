const path = require('path');
module.exports = {
  env: {
    browser: true
  },
  extends: [
    path.resolve(__dirname, '..', '.eslintrc.js'),
    'plugin:vue/essential'
  ],
  plugins: [
    'vue'
  ]
};
