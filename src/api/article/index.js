import ajax from '../ajax'

const url = {
  getArts: '/article',
  postArt: '/article'
}

export default {
  getArts () {
    return ajax.get(url.getArts)
  },
  postArt ({title, content}) {
    return ajax.post(url.postArt, {
      title,
      content
    })
  }
}

