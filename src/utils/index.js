/*
 * 获取汉字首字母 -https://github.com/hotoo/pinyin
 * https://www.javascriptcn.com/read-54459.html
 */
const pinyin = require('pinyin')
/**
 * 处理汉字转换拼音首字母
 * @param word
 */
export function handlerFirstLetter(word) {
  let firstLetterStr = ''
  pinyin(word, {
    // 是否启用分词模式，中文分词有助于极大的降低多音字问题。 但性能会极大的下降，内存也会使用更多
    segment: false,
    // 是否启用多音字模式，默认关闭
    heteronym: false,
    // 首字母风格，只返回拼音的首字母部分
    style: pinyin.STYLE_FIRST_LETTER
  }).forEach((item) => {
    firstLetterStr += item.join('')
  })
  return firstLetterStr.toUpperCase()
}
