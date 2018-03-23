//    jsonp共用的Headers的Query String Parameters部分
//自代码
// export const commonParams = {
//   // callback:'recom6617298718436375',
//   // g_tk: 5381,
//   // jsonpCallback:'recom6617298718436375',
//   // inCharset: 'utf8',
//   // outCharset: 'utf-8',
//   // notice: 0,
//   // format: 'jsonp',
// }
// export const options = {
//   param: 'callback',
// }
//视频代码
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback',
}

export const ERR_OK = 0

// 传递函数名
export const option = {
  params: {
    'jsonpCallback':successCallback(),
  }
}
export function successCallback() {
  var h1=document.createElement('h1');
  document.getElementsByTagName("body")[0].append(h1);
  return h1.innerHTML
}
