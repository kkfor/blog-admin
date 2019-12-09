import axios from 'axios'
import config from '@/config'
import { notification } from 'antd'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: config.baseURL
})

instance.interceptors.request.use(function(req) {
  const auth = Cookies.get('token')
  if (auth) {
    req.headers.Authorization = 'Bearer ' + auth
  }
  return req
}, function(error) {
  openNotification({ type: 'error', content: '请求出错'})
})
instance.interceptors.response.use(
  function(res) {
    return res.data.data
  },
  function(error) {
    const message = error.response ? error.response.data.message : '响应出错'
    openNotification({ type: 'error', content: message })
    return Promise.reject(message)
  }
)

const openNotification = ({ type = 'open', content }) => {
  notification[type]({
    message: '通知',
    description: content,
    duration: 2
  })
}

const Ajax = (methods, url, data) => {
  return new Promise((resolve, reject) => {
    instance[methods](url, data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  post(url, data) {
    return Ajax('post', url, data)
  },
  put(url, data) {
    return Ajax('put', url, data)
  },
  del(url) {
    return Ajax('delete', url)
  },
  get(url, params) {
    return Ajax('get', url, {
      params
    })
  }
}
