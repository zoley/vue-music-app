import axios from 'axios'
import { ERR_OK } from '@/api/config'
const service = axios.create({
  baseURL: '/',
  timeout: 3000
})

function getContentType(config) {
  if (config.data && config.data.formData) {
    return 'multipart/form-data'
  }
  return 'application/json; charset=UTF-8'
}
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

  config.headers['Content-Type'] = getContentType(config)
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
