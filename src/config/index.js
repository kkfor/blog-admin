export default {
  baseURL: process.env.NODE_ENV === 'development' ?
    'http://localhost:5000/api' :
    'http://118.24.148.253:5000/api'
}