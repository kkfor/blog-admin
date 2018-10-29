import axios from 'axios'
import config from './config'
import { notification } from 'antd';

const instance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true
}) 

instance.interceptors.request.use(function(req) {
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
    }
  }
})

const openNotification = ({type='open', content}) => {
  notification[type]({
    message: '通知',
    description: content,
    duration: 2
  })
}

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