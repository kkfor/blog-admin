import ajax from '../ajax'

const url = {
  getCategory: '/category/',
  getCategories: '/category',
  postCategory: '/category',
  putCategory: '/category/',
  delCategory: '/category/'
}

export default {
  getCategory(id) {
    const uri = url.getCategory + id
    return ajax.get(uri)
  },
  getCategories() {
    return ajax.get(url.getCategories)
  },
  postCategory(obj) {
    return ajax.post(url.postCategory, obj)
  },
  putCategory(id, obj) {
    const uri = url.putCategory + id
    return ajax.put(uri, obj)
  },
  delCategory(id) {
    const uri = url.delCategory + id
    return ajax.del(uri)
  }
}
