/**
 * 时间格式化工具
 */

export default (times, format = 'yyyy-MM-dd HH:mm:ss') => {
  const time = Date.parse(times)

  if (!time) return null

  const date = new Date(times)

  const ele = {
    // 月
    'M+': date.getMonth() + 1,
    // 天
    'd+': date.getDate(),
    // 24小时制小时
    'H+': date.getHours(),
    // 上午|下午
    'a' : date.getHours() >= 12 ? '下午': '上午',
    // 分钟
    'm+': date.getMinutes(),
    // 秒
    's+': date.getSeconds(),
    // 毫秒
    'S+': date.getMilliseconds()
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let i in ele) {
    if (new RegExp(`(${i})`).test(format)) {
      let replace = ''
      if(RegExp.$1.length === 1) {
        replace = ele[i]
      } else if (RegExp.$1.length === 2) {
        replace = ('00' + ele[i]).substr((ele[i] + '').length)
      } else if (RegExp.$1.length === 3) {
        replace = ('000' + ele[i]).substr((ele[i] + '').length)
      }
      format = format.replace(RegExp.$1, replace)
    }
  }

  return format
}