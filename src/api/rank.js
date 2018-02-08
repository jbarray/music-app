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
