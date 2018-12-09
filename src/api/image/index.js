import ajax from '../ajax'

const url = {
  postItem: '/image'
}

export default {
  postItem(obj) {
    return ajax.post(url.postItem, obj)
  }
}