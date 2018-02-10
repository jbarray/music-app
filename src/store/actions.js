import * as types from './mutation-types'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/utill'
import {saveSearch} from '../common/js/cache'
function findIndex(list, song) {
  // return list.length>0? list.findIndex((item) => {
  //   return item.id === song.id
  // }) : ''
  if(list.length) {
    list.findIndex((item) => {
      return item.id === song.id
    })
  }else{
    return -2
  }
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  // if (state.mode === playMode.random) {
  //   let randomList = shuffle(list)
  //   commit(types.SET_PLAYLIST, randomList)
  //   index = findIndex(randomList, list[index])
  // } else {
  //   commit(types.SET_PLAYLIST, list)
  // }
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  //播放列表是打乱原来列表的顺序,重新洗牌得来的
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  //从randomList的第一个歌曲开始播放
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

//往现有列表中添加歌曲 因为需要获取原来的playlist等数据 所以需要state
export const insertSong = function ({commit,state},{song}) {
  let playlist = state.playlist.slice
  let sequenceList = state.sequenceList.slice
  let currentIndex = state.currentIndex
  //记录当前歌曲位置
  let currentSong = playlist[currentIndex]
  //查找原列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist,song)
  //因为是插入歌曲 所以当前索引值需要+1
  currentIndex++
  //插入这首歌在当前索引位置
  playlist.splice(currentIndex, 0, song)
  //如果已经有这首歌
  if(fpIndex > -1) {
    //如果当前插入的序号大于列表中的序号
    if(currentIndex > fpIndex) {
      playlist.splice(fpIndex,1)
      //因为元歌曲出现在当前位置之前,删除后 currentIndex必须-1
      currentIndex--
    }else{
      //因为新歌曲已经插入了 所以fpindex的数据需要+1
      playlist.splice(fpIndex + 1,1)
    }
  }
  //在sequenceList中正在播放歌曲的位置
  let currentSIndex = findIndex(sequenceList, currentSong)
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if(fsIndex > -1) {
    if(currentIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
      currentIndex--
    }else{
      sequenceList.splice(fsIndex+1,1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
}

//存储搜索历史到localStorage
export const saveSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}
