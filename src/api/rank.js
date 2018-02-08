import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'
//获取排行榜数据
export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?'

  const data = Object.assign({},commonParams,{
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return jsonp(url,data,options)
}

//获取进入榜单模块后的歌曲列表
export function getSongList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({},commonParams,{
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })
  return jsonp(url,data,options)
}
