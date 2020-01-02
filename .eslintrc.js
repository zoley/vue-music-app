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
    "semi": 0, //语句分号结尾，加不加都行
    'eol-last': 0 //2文件以换行符结束,0都行
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
