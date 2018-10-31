import ajax from '../ajax'

const url = {
  getArts: '/article',
  postArt: '/article'
}

export default {
  getArts (params) {
    return ajax.get(url.getArts, params)
  },
  postArt ({title, content}) {
    return ajax.post(url.postArt, {
      title,
      content
    })
  }
}

