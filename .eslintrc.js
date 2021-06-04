/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  // extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', //typescript-eslint推荐规则
    'plugin:prettier/recommended', //使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出.确保在最后一个.
    'prettier' //使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'error'
  },
  ignorePatterns: ['dist']
}
