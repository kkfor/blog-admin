import ajax from '../ajax'

const url = {
  getTag: '/tag/',
  getTags: '/tag',
  postTag: '/tag',
  putTag: '/tag/',
  delTag: '/tag/'
}

export default {
  getTag(id) {
    const uri = url.getTag + id
    return ajax.get(uri)
  },
  getTags() {
    return ajax.get(url.getTags)
  },
  postTag(obj) {
    return ajax.post(url.postTag, obj)
  },
  putTag(id, obj) {
    const uri = url.putTag + id
    return ajax.put(uri, obj)
  },
  delTag(id) {
    const uri = url.delTag + id
    return ajax.del(uri)
  }
}
