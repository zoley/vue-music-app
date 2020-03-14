import { commonParams } from './config'
// import jsonp from '@/utils/jsonp'
import request from '@/utils/request'

// 获取推荐banner
export function getBanner () {
  return request({
    method: 'get',
    url: '/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    params: {
      uin: 0,
      platform: 'h5',
      needNewCode: 1,
      ...commonParams
    }
  })
}

export function getSheetList () {
  const url = '/pc/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: JSON.stringify({
      'comm': { 'ct': 24 },
      'playlist': {
        'method': 'get_playlist_by_category',
        'param': {
          'id': 3317,
          'curPage': 1,
          'size': 40,
          'order': 5,
          'titleid': 3317
        },
        'module': 'playlist.PlayListPlazaServer'
      }
    }),
    ...commonParams
  })
  return request({
    method: 'get',
    url: url,
    params: data
  })
}
