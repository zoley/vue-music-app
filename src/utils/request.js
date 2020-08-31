import axios from 'axios'
import { ERR_OK } from '@/api/config'
const service = axios.create({
  baseURL: '/',
  timeout: 3000
})
/*
 * ## Interceptors
 * You can intercept requests or responses before they are handled by `then` or `catch`.
 */
service.interceptors.request.use((config) => {
  /*
   * Do something before request is sent
   * config.headers['TBase-Access-Origin'] = getAccessOrigin()
   * config.headers['TBase-Access-Token'] = getToken()
   */
  if (config.headers.json) {
    config.headers['Content-Type'] = 'application/json'
  } else {
    config['transformRequest'] = [function(data) {
      if (!data) return undefined
      const formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      return formData
    }]
  }
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})
service.interceptors.response.use(
  async(response) => {
    // console.log(response);
    const res = response.data
    const { code } = res
    if (Object.is(code, ERR_OK)) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    // console.error('++++++++++响应失败拦截 error++++++++++:', error)
    return Promise.reject(error.data)
  }
)

export default service
