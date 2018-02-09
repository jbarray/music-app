import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({},{
    platform:'h5',
    needNewCode:1,
    uin:0
  },commonParams)

  return jsonp(url,data,options)
}
