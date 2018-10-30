import ajax from '../ajax'

const url = {
  login: '/user/login',
  register: '/user/register'
}

export default {
  async login({username, password}) {
    return await ajax.post(url.login, {
      username,
      password
    })
  },

  async register({username, password}) {
    return await ajax.post(url.register, {
      username,
      password
    })
  }
}