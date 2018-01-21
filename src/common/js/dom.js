// 判断元div中是否有此classname
export function hasClass(el, className) {
  // 创建一个正则表达式,如果el中有这个classname,则为真
  let reg= new RegExp('(^|\\s)'+className+'(\\s|$)')
  return reg.test(el,className)
}

export function addClass(el, className) {
 if(hasClass(el,className)){
   return
 }
 // 拆开原来的el的className
 let newClass = el.className.split(' ')
  // 放入className
  newClass.push(className)
  // 合并
  el.className = newClass.join(' ')
}

