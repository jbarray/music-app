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

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

// hack的复用
let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
