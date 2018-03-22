import * as types from './mutation-types'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/utill'
import {saveSearch,deleteSearch,clearSearch, savePlay } from '../common/js/cache'

function checkAdult(item,song) {
  while(id === song.id) {
    return item.id
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
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const insertSong = function ({commit,state}, song) {
   let playlist = state.playlist.slice(0)
   let sequenceList = state.sequenceList.slice(0)
   let currentIndex = state.currentIndex
  // 记录当前歌曲位置
   let currentSong = playlist[currentIndex]
  // 查找原列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
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
  commit(types.SET_FULL_SCREEN, true)
}

//存储搜索历史到localStorage
export const saveSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

//从localStorage中删除某一个记录
export const deleteSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY,clearSearch())
}

export const deleteSong = function ({commit, state}, item) {
  let playlist = state.playlist.slice(0)
  let sequenceList = state.sequenceList.slice(0)
  let currentIndex = state.currentIndex
  const pIndex = findIndex(playlist, item)
  playlist.splice(pIndex,1);
  //修改sequenceList
  const sIndex = findIndex(sequenceList, item)
  sequenceList.splice(sIndex,1);
  if(currentIndex > pIndex ||currentIndex === playlist.length) {
    currentIndex--;
  }

  commit(types.SET_PLAYLIST,playlist)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)

  //如果全部删完,设置播放状态为暂停
  if(!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  }
}

export const deleteSongList = function ({commit}){
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory=function({commit}, song){
   const playHistory = savePlay(song)
   commit(types.SET_PLAY_HISTORY, playHistory)
}
