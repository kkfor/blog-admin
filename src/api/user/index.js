import ajax from '../ajax'

const url = {
  login: '/user/login'
}

export default {
  async login({username, password}) {
    return await ajax.post(url.login, {
      username,
      password
    })
  }
}