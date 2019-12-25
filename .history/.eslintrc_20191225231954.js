module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-extra-semi": 2, //不允许出现不必要的分号
    "semi": [2, "always"], //强制语句分号结尾
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
