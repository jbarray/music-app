//随机生成一个数字
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr){
  for(let i = 0;i < arr.length; i++) {
    // 将当前i的值与i以内某个下标的值进行调换,为了生成新数组
    let j = getRandomInt(0,i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = arr[i]
  }
  return arr
}
