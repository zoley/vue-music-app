import { commonParams } from './config'
// import jsonp from '@/utils/jsonp'
import request from '@/utils/request'

// 获取歌手列表
export function getSingerList() {
  const url = '/pc/cgi-bin/musics.fcg'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    sign: 'zzaywxm8m1zex1xosb2f3fef04bda3a286eeb40136f6b80f4a',
    platform: 'yqq.json',
    needNewCode: 0,
    format: 'json',
    data: JSON.stringify({
      'comm': { 'ct': 24, 'cv': 0 },
      'singerList': {
        'module': 'Music.SingerListServer',
        'method': 'get_singer_list',
        'param': {
          'area': -100,
          'sex': -100,
          'genre': -100,
          'index': -100,
          'sin': 0,
          'cur_page': 1
        }
      }
    })
  })
  return request({
    method: 'get',
    url: url,
    params: data
  })
}
