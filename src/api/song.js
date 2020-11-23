import { commonParams } from './config'
import request from '@/utils/request'
let _uid = ''
// 获取歌曲列表
export function getRealSongUrl(songs) {
  const url = '/pc/cgi-bin/musicu.fcg'
  const comm = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  const url_mid = {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid: _getGuid(),
      uin: '0',
      loginflag: 0,
      platform: '23',
      songmid: songs.map(x => x.mid),
      songtype: Array.from({ 'length': songs.length }).fill(0)
    }
  }
  return new Promise((resolve, reject) => {
    let tryTime = 3
    function ajax() {
      return request({
        method: 'post',
        url,
        headers: {
          json: true
        },
        data: {
          comm,
          url_mid
        }
      }).then((res) => {
        const info = res.url_mid && res.url_mid.data && res.url_mid.data.midurlinfo[0]
        if (info) {
          resolve(res)
        } else {
          retry()
        }
      })
    }
    function retry() {
      if (--tryTime >= 0) {
        ajax()
      } else {
        reject(new Error('Can not get the songs url'))
      }
    }
    ajax()
  })
}

// 获取歌曲歌词
export function getLyricById(id) {
  const url = '/api/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg'
  const comm = Object.assign({}, commonParams, {
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 1,
    nobase64: 1,
    g_tk_new_20200303: 5381,
    loginUin: 0,
    hostUin: 0,
    musicid: id
  })

  return request({
    method: 'get',
    url: url,
    params: comm
  })
}

/**
 * 获取标识符
 */
function _getGuid() {
  if (!_uid) {
    const t = new Date().getUTCMilliseconds()
    _uid = '' + Math.round(2147483647 * Math.random()) * t * 1e10
  }
  return _uid
}
