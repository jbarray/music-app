// import {getLyric} from "../../api/song"
import {ERR_OK} from "../../api/config"
export default class song {
  constructor({id,name,mid,singer,album,duration,image,url}) {
    this.id = id
    this.name = name
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  // getLyric() {
  //   console.log("123")
    // getLyric(this.mid).then((res) => {
    //   if(res.retconde === ERR_OK) {
    //   this.lyric = res.lyric
    //   console.log(this.lyric)
    // }
    // })
  // }
}

export function createSong(musicData,p) {
  return new song({
    id:musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${p}&guid=658661956&uin=0&fromtag=66`
  })
}
//将歌手name直接添加,若有多个歌手,中间用/隔开
export function filterSinger(singer) {
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach((n) => {
    ret.push(n.name)
  })
  return ret.join('/')
}

