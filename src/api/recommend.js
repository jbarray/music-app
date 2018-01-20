import jsonp from '../common/js/jsonp'
 import {commonParams,options} from "./config"
// 自代码
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // const data = Object.assign({}, commonParams,
  const data = Object.assign({},commonParams,
    {
    // platform: 'yqq',
    // loginUin:0,
    // hostUin:0,
    // needNewCode:0,
    //   callback:'recom6617298718436375',
    //   g_tk:5381,
      // jsonpCallback:'recom6617298718436375',
      // loginUin:0,
      // hostUin:0,
      // format:'jsonp',
      // inCharset:'utf8',
      // outCharset:'utf-8',
      // notice:0,
      // platform:'yqq',
      // needNewCode:0
      platform: 'h5',
      uin: 0,
      needNewCode: 1
  }
  );
  return jsonp(url,data,options);
}
//视频代码

// export function getRecommend() {
//   const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
//
//   const data = Object.assign({}, commonParams, {
//     platform: 'h5',
//     uin: 0,
//     needNewCode: 1
//   })
//
//   return jsonp(url, data, options)
// }
