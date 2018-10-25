import axios from 'axios'
import config from '../config'

const instance = axios.create({
  baseURL: config.baseURL
}) 

instance.interceptors.request.use(function(req) {
  return req
})
instance.interceptors.response.use(function(res) {
  return res
})

export default {
  post(url, data) {
    return new Promise((resolve, reject) => {
      instance.post(url, data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  get(url, params) {
    return new Promise((resolve, reject) => {
      instance.get(url, {
        params: params
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}