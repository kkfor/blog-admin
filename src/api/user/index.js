import ajax from '../ajax'

const url = {
  login: '/user/login',
  register: '/user/register'
}

export default {
  login(obj) {
    return ajax.post(url.login, obj)
  },

  register(obj) {
    return ajax.post(url.register, obj)
  }
}