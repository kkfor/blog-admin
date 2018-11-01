import axios from 'axios'
import config from './config'
import { notification } from 'antd'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true
}) 

instance.interceptors.request.use(function(req) {
  const auth = Cookies.get('token')
  req.headers = {
    'Authorization': auth,
    ...req.headers
  }
  return req
})
instance.interceptors.response.use(function(res) {
  if(res.status === 200) {
    if(res.data.code === 1) {
      openNotification({type: 'success', content: res.data.message})
      return res.data
    }
    if(res.data.code === 0) {
      openNotification({type: 'error', content: res.data.message})
      throw new Error(res.data.message)
    }
  }
}, function(error) {
  if (error.response && error.response.status === 401) {
    openNotification({type: 'error', content: error.response.data.message})
  }
})

const openNotification = ({type='open', content}) => {
  notification[type]({
    message: '通知',
    description: content,
    duration: 2
  })
}

const post = (methods, url, data) => {
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
    post('post', url, data)
  },
  put(url, data) {
    post('put', url, data)
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