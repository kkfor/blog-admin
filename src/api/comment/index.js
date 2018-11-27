import ajax from '../ajax'

const url = {
  getList: '/comment',
  getItem: '/comment/',
  postItem: '/comment',
  putItem: '/comment/',
  delItem: '/comment/'
}

export default {
  getList() {
    return ajax.get(url.getList)
  },
  getItem(id) {
    const uri = url.getItem + id
    return ajax.get(uri)
  },
  postItem(obj) {
    return ajax.post(url.postItem, obj)
  },
  putItem(id, obj) {
    const uri = url.putItem + id
    return ajax.put(uri, obj)
  },
  delItem(id) {
    const uri = url.delItem + id
    return ajax.del(uri)
  }
}