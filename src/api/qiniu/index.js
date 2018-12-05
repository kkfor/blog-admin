import ajax from '../ajax'

const url = {
  getToken: '/qiniu'
}

export default {
  getToken() {
    return ajax.get(url.getToken)
  }
}