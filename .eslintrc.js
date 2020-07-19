module.exports = {
  env: {
    es2020: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-new': 0,
    'eol-last': 0,
    'no-console': 0,
    'no-cond-assign': 0,
    'no-prototype-builtins': 0,
    '@typescript-eslint/ban-types': 0,
    'import/no-named-default': 0,
    'space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/no-empty-function': 0
  }
};
