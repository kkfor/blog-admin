import axios from 'axios'
import config from '@/config'
import { notification } from 'antd'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: config.baseURL,
  // withCredentials: true
}) 

instance.interceptors.request.use(function(req) {
  const auth = Cookies.get('token')
  if(auth) {
    req.headers.Authorization = 'Bearer ' + auth
  }
  return req
})
instance.interceptors.response.use(function(res) {
  if(res.status === 200 || res.status === 201) {
    return res.data
  } else {
    openNotification({type: 'error', content: '请求出错'})
  }
}, function(error) {
  if (error.response && error.response.status === 401) {
    openNotification({type: 'error', content: '暂无权限'})
  }
})

const openNotification = ({type='open', content}) => {
  notification[type]({
    message: '通知',
    description: content,
    duration: 2
  })
}

const Ajax = (methods, url, data) => {
  return new Promise((resolve, reject) => {
    instance[methods](url, data).then(res => {
      resolve(res)
    }).catch(err => {
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