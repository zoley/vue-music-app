import request from '@/utils/request'

export function logout () {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
