import originJsonp from 'jsonp'

export function handleParam(param) {
  let url = ''
  for (const k in param) {
    const value = param[k] ? param[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export default function jsonp(url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + handleParam(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
