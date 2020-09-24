import { commonParams, options } from './config'
import jsonp from '@/utils/jsonp'
import request from '@/utils/request'
import axios from 'axios'
let _uid = ''
// 获取歌手列表
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
    function ajax() {
      return axios.post(url, {
        comm,
        url_mid
      })
    }
    ajax()
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
