import jsonp from '../common/js/jsonp'
 import {commonParams,options,option} from "./config"
// 自代码
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  // const data = Object.assign({}, commonParams,
  const data = Object.assign({},commonParams,
    {
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq'
  }
  );
  return jsonp(url,data,options);
}
//获取歌手详细内容
export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, options)
}
//获取歌曲播放地址
export function getSongDetail(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    loginUin: 0,
    uin:0,
    needNewCode: 0,
    platform: 'yqq',
    cid:205361747,
    guid:658661956,
    // jsonpCallback:successCallback(songmid),
    // callback:'MusicJsonCallback8729489705873366',
    // callback:successCallback(),
     songmid:songmid,
    filename:'C400'+songmid+'.m4a'
  })

  return jsonp(url, data, option)
}


