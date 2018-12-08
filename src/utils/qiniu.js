import * as qiniu from 'qiniu-js'

export default (file, fileName, token) => {
  return new Promise((resolve, reject) => {
    const observable = qiniu.upload(file, fileName, token)
    const observer = {
      complete(res) {
        resolve(res)
      }
    }
    observable.subscribe(observer)
  })
}