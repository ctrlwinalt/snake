const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        return []
    } else {
        return elements
    }
}
const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const nChangeToXY = function(i) {
    let r = []
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    let x = Math.floor(i / eachLineNum)
    let y = i % eachLineNum
    r.push(x)
    r.push(y)
    return r

}

const xyChangeToN = function(x, y) {
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    let n = eachLineNum * x + y
    return n

}

const htmlFormXY = function(nums, x, y) {
    let eachLineNum = es('.gua-num').length / es('.gua-line').length
    let n = eachLineNum * x + y
    return nums[n]
}