module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false
      }
    ],
    // 可以用来代替@babel/preset-typescrit
    ['babel-preset-typescript-vue', {
      isTSX: true,
      allExtensions: true
    }]

  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
    'transform-vue-jsx'
  ]
};
