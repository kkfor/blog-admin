export default {
  baseURL: process.env.NODE_ENV === 'development' ?
    '//localhost:5000' :
    '//api.kkfor.com',
  staticURL: '//static.kkfor.com',
  upLoadImg: '//upload-z1.qiniup.com'
}