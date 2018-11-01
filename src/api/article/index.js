import ajax from '../ajax'

const url = {
  getArt: '/article/',
  getArts: '/article',
  postArt: '/article',
  putArt: '/article/'
}

export default {
  getArt (id) {
    const uri = url.getArt + id
    return ajax.get(uri)
  },
  getArts (params) {
    return ajax.get(url.getArts, params)
  },
  postArt (obj) {
    return ajax.post(url.postArt, obj)
  },
  putArt (id, obj) {
    const uri = url.putArt + id
    return ajax.put(uri, obj)
  }
}

