// import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

// const PLAY_KEY = '__play__'
// const PLAY_MAX_LEN = 200
//
// const FAVORITE_KEY = '__favorite__'
// const FAVORITE_MAX_LEN = 200

// function insertArray(arr, val, compare, maxLen) {
//   const index = arr.findIndex(compare)
//   if (index === 0) {
//     return
//   }
//   if (index > 0) {
//     arr.splice(index, 1)
//   }
//   arr.unshift(val)
//   if (maxLen && arr.length > maxLen) {
//     arr.pop()
//   }
// }
//
// export function saveSearch(query) {
//   let searches = storage.get(SEARCH_KEY, [])
//   insertArray(searches, query, (item) => {
//     return item === query
//   }, SEARCH_MAX_LEN)
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }

export function saveSearch(query) {
  if (!window.localStorage) {
    alert("浏览器不支持localStorage")
    return false
  } else {
    var storage = window.localStorage
    insertArray(storage, query, SEARCH_MAX_LEN)
    console.log(storage)
  }
}

function insertArray(arr, val, maxLen) {
  var index = arr.forEach((item) => {
    return item === query
  })
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(query)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
