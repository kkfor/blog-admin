export default {
  baseURL: process.env.NODE_ENV === 'development' ?
    '//localhost:5000/api' :
    '//118.24.148.253:5000/api',
  staticURL: '//static.kkfor.com',
  upLoadImg: 'http://upload-z1.qiniup.com'
}