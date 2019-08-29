export default {
  baseURL: process.env.NODE_ENV === 'development' ?
    '//localhost:3030' :
    '//api.kkfor.com/api',
  staticURL: '//static.kkfor.com',
  upLoadImg: '//upload-z1.qiniup.com'
}