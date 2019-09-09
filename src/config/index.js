export default {
  baseURL: process.env.NODE_ENV === 'development' ?
    '//localhost:5000' :
    // 'https://easy-mock.com/mock/5d664fbdeff0674a6043a1f6/api' :
    '//api.kkfor.com',
  staticURL: '//static.kkfor.com',
  upLoadImg: '//upload-z1.qiniup.com'
}