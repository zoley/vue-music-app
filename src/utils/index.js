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

/**
 * 创建歌曲对象
 * @param {*} musicData
 */
export function createNewSong(musicData) {
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
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

/**
 * 设置歌手
 * @param {*} singer
 */
function filterSinger(singer) {
  return singer.map(x => x.name).join('/') || ''
}
