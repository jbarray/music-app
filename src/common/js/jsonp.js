import originJsonp from 'jsonp'
export default function jsonp(url, data, option) {

  // 如果url后面没有? 就加一个? 若有的话 就加一个&
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  // 使用es6的Promise来实现异步
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
//    将url和data中的内容进行拼接
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
