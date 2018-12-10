import ajax from '../ajax'

const url = {
  postItem: '/image',
  getList: '/image'
}

export default {
  postItem(obj) {
    return ajax.post(url.postItem, obj)
  },
  getList(id) {
    return ajax.get(url.getList, id)
  }
}