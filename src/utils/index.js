
/*
 * 获取汉字首字母 -https://github.com/hotoo/pinyin
 * https://www.javascriptcn.com/read-54459.html
 */
const pinyin = require('pinyin')
/**
 * 处理汉字转换拼音首字母
 * @param word
 */
function handlerFirstLetter(word) {
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

/**
 * 创建歌曲对象
 * @param {*} musicData
 */
function createNewSong(musicData) {
  class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
      this.id = id
      this.mid = mid
      this.singer = singer
      this.name = name
      this.album = album
      this.duration = duration
      this.image = image
      this.url = url
      this.filename = `C400${this.mid}.m4a`
    }
  }
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.url
  })
}

/**
 * 设置歌手
 * @param {*} singer
 */
function filterSinger(singer) {
  return singer.map(x => x.name).join('/') || ''
}

/**
 * 获取最小值和最大值之间的随机值
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 洗牌-随机
 * @param {*} arr 数组
 */
const shuffle = (arr) => {
  const arrClone = arr
  arrClone.forEach((x, i, _arr) => {
    const j = getRandomInt(0, i)
    const temp = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = temp
  })
  return arrClone
}

export default {
  // 处理汉字转换拼音首字母
  handlerFirstLetter,
  // 创建歌曲对象
  createNewSong,
  // 洗牌
  shuffle
}
