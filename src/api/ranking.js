import request from '@/utils/request'
import { commonParams, options } from './config'
import jsonp from '@/utils/jsonp'

export function getRankingList() {
  const url = '/pc/cgi-bin/musics.fcg'
  const data = {
    'comm': {
      'cv': 4747474,
      'ct': 24,
      'format': 'json',
      'inCharset': 'utf-8',
      'outCharset': 'utf-8',
      'notice': 0,
      'platform': 'yqq.json',
      'needNewCode': 1,
      'uin': 0,
      'g_tk_new_20200303': 5381,
      'g_tk': 5381
    },
    'req_1': {
      'module': 'musicToplist.ToplistInfoServer',
      'method': 'GetAll',
      'param': {

      }
    }
  }
  const query = { sign: 'zzb257ebf58dkmofrktpegwawhtqo8hg174cbc7a' }
  return request({
    url: url,
    method: 'post',
    data,
    params: query
  })
}

export function getRankingSongList(topid) {
  const url = '/api/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })
  return jsonp(url, data, options)
}
