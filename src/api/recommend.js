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

// 获取KTV热歌歌单
export function getSheetList () {
  const url = '/pc/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: JSON.stringify({
      'comm': {
        'ct': 24
      },
      'playlist': {
        'method': 'get_playlist_by_category',
        'param': {
          'id': 64,
          'curPage': 1,
          'size': 40,
          'order': 5,
          'titleid': 64
        },
        'module': 'playlist.PlayListPlazaServer'
      }
      // 为你推荐
      // 'comm': { 'ct': 24 },
      // 'recomPlaylist': {
      //   'method': 'get_hot_recommend',
      //   'param': {
      //     'async': 1,
      //     'cmd': 2
      //   },
      //   'module': 'playlist.HotRecommendServer'
      // }
      // 官方推荐
      // 'playlist': {
      //   'method': 'get_playlist_by_category',
      //   'param': {
      //     'id': 3317,
      //     'curPage': 1,
      //     'size': 40,
      //     'order': 5,
      //     'titleid': 3317
      //   },
      //   'module': 'playlist.PlayListPlazaServer'
      // }
    })
  })
  return request({
    method: 'get',
    url: url,
    params: data
  })
}
