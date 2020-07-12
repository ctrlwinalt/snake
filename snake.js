const line = function(n) {
    let l = []
    for (let i = 0; i < n; i++) {
        l.push(0)
    }
    return l
}

const square = function(n) {
    let l = []
    for (let i = 0; i < n; i++) {
        let num = line(n)
        l.push(num)
    }
    return l
}

const clonedSquare = function(array) {
    let s = []
    for (let i = 0; i < array.length; i++) {
        let line = array[i]
        let e = line.slice(0)
        s.push(e)
    }
    return s
}

const templateNum = function(n, i, j) {
    let t = `
    <div id="id-line-${i}-row-${j}" class="gua-num" data-line=${i} data-row=${j}></div>
    `
    return t

}

const templateLine = function(div, i) {
    let t = `
    <div class="gua-line" data-line=${i}>
        ${div}
    </div>
    `
    return t
}

const insertHtml = function(line) {
    let div = e('#id-gua-square')
    div.insertAdjacentHTML("beforeend", line)
}

const drawSquare = function(array) {
    let arr = clonedSquare(array)
    for (let i = 0; i < arr.length; i++) {
        let line = arr[i]
        let r = ''
        for (let j = 0; j < line.length; j++) {
            let numHtml = templateNum(line[j], i, j)
            r += numHtml
        }
        let gualine = templateLine(r, i)
        insertHtml(gualine)
    }
}

const initSnake = function(init) {
    let square2 = clonedSquare(init)
    for (let i = 0; i < square2.length; i++) {
        let x = square2[i][0]
        let y = square2[i][1]
        let div = htmlFormXY(es('.gua-num'), x, y)
        div.classList.add('show')
        if (i === square2.length - 1) {
            div.classList.add('head')

        } else if (i === 0) {
            div.classList.add('tail')

        }
    }

}

const draw = function(square) {
    let snakeSquare = clonedSquare(square)

    removeClassAll('show')
    removeClassAll('head')
    removeClassAll('tail')

    let tail = snakeSquare[0]
    let tailNewId = `#id-line-${tail[0]}-row-${tail[1]}`
    e(tailNewId).classList.add('tail')

    for (let i = 0; i < snakeSquare.length; i++) {
        let s = snakeSquare[i]
        let newid = `#id-line-${s[0]}-row-${s[1]}`
        e(newid).classList.add('show')
    }

    let head = snakeSquare[snakeSquare.length - 1]
    let headid = `#id-line-${head[0]}-row-${head[1]}`
    e(headid).classList.add('head')

}

const hitSnake = function(x, y, snake) {
    let snakeSquare = clonedSquare(snake)
    for (let i = 0; i < snakeSquare.length; i++) {
        let line = snakeSquare[i]
        if (x === line[0] && y === line[1]) {
            return true
        }
    }
    return false
}

const randomXY = function(snake) {
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10)
    let r = [x, y]

    for (let i = 0; i < snake.length; i++) {
        let s = snake[i]
        if (x === s[0] && y === s[1]) {
            r = randomXY(snake)
        }
    }
    return r
}

const food = function(snake) {
    let array = snake.slice(0)
    let s = randomXY(array)
    let cid = `#id-line-${s[0]}-row-${s[1]}`
    e(cid).classList.add('food')
}

const eatFood = function(nextX, nextY) {
    let food = e('.food')
    let foodX = Number(food.dataset.line)
    let foosY = Number(food.dataset.row)
    if (foodX === nextX && foosY === nextY) {
        food.classList.remove('food')
        return true
    } else {
        return false
    }
}

const moveLeft = function(snake, timer) {
    let r = clonedSquare(snake)
    let elseSnake = r.slice(1, -1)
    let x = r[r.length - 1][0]
    let y = r[r.length - 1][1]
    let nextX = x
    let nextY = y - 1
    let newArr = clonedSquare(r)
    newArr.push([nextX, nextY])

    if (nextY >= 0 && !hitSnake(nextX, nextY, elseSnake)) {
        if (eatFood(nextX, nextY)) {
            draw(newArr)
            food(newArr)
            return newArr

        } else {
            draw(newArr.slice(1))
            return newArr.slice(1)
        }

    } else {
        clearInterval(timer)
        alert('Game Over !')
    }
}

const moveRight = function(snake, timer) {
    let j = es('.gua-num').length / es('.gua-line').length
    let r = clonedSquare(snake)
    let elseSnake = r.slice(1, -1)
    let x = r[r.length - 1][0]
    let y = r[r.length - 1][1]
    let nextX = x
    let nextY = y + 1
    let newArr = clonedSquare(r)
    newArr.push([nextX, nextY])

    if (nextY < j && !hitSnake(nextX, nextY, elseSnake)) {
        if (eatFood(nextX, nextY)) {
            draw(newArr)
            food(newArr)
            return newArr

        } else {
            draw(newArr.slice(1))
            return newArr.slice(1)

        }

    } else {
        clearInterval(timer)
        alert('Game Over !')
    }

}

const moveUp = function(snake, timer) {
    let r = clonedSquare(snake)
    let elseSnake = r.slice(1, -1)
    let x = r[r.length - 1][0]
    let y = r[r.length - 1][1]
    let nextX = x - 1
    let nextY = y
    let newArr = clonedSquare(r)
    newArr.push([nextX, nextY])

    if (nextX >= 0 && !hitSnake(nextX, nextY, elseSnake)) {
        if (eatFood(nextX, nextY)) {
            draw(newArr)
            food(newArr)
            return newArr

        } else {
            draw(newArr.slice(1))
            return newArr.slice(1)
        }

    } else {
        clearInterval(timer)
        alert('Game Over !')
    }

}

const moveDown = function(snake, timer) {
    let r = clonedSquare(snake)
    let elseSnake = r.slice(1, -1)
    let x = r[r.length - 1][0]
    let y = r[r.length - 1][1]
    let nextX = x + 1
    let nextY = y
    let newArr = clonedSquare(r)
    newArr.push([nextX, nextY])

    if (nextX < es('.gua-line').length && !hitSnake(nextX, nextY, elseSnake)) {
        if (eatFood(nextX, nextY)) {
            draw(newArr)
            food(newArr)
            return newArr

        } else {
            draw(newArr.slice(1))
            return newArr.slice(1)
        }

    } else {
        clearInterval(timer)
        alert('Game Over !')
    }

}

const changeDir = (dir, notgo) => {
    let keys = Object.keys(dir)
    for (let i = 0; i < keys.length; i++) {
        let k = keys[i]
        dir[k] = true
    }
    dir[notgo] = false
}

const bindEventMove = function() {
    let snake = [
        [8, 5],
        [8, 6],
        [8, 7],
    ]

    let interval = 150

    let dir = {
        'goLeft': false,
        'goRight': true,
        'goUp': true,
        'goDown': true,
    }

    initSnake(snake)
    food(snake)

    let timer = setInterval(() => {
        // snake = moveRight(snake, timer)
    }, interval)


    document.addEventListener('keydown', function(event) {

        if (event.keyCode === 37 && dir.goLeft) {
            // left
            changeDir(dir, 'goRight')
            clearInterval(timer)
            timer = setInterval(() => {
                snake = moveLeft(snake, timer)
            }, interval)

        } else if (event.keyCode === 39 && dir.goRight) {
            // Right
            changeDir(dir, 'goLeft')
            clearInterval(timer)
            timer = setInterval(() => {
                snake = moveRight(snake, timer)
            }, interval)

        } else if (event.keyCode === 38 && dir.goUp) {
            // Up
            changeDir(dir, 'goDown')
            clearInterval(timer)
            timer = setInterval(() => {
                snake = moveUp(snake, timer)
            }, interval)

        } else if (event.keyCode === 40 && dir.goDown) {
            // Down
            changeDir(dir, 'goUp')
            clearInterval(timer)
            timer = setInterval(() => {
                snake = moveDown(snake, timer)
            }, interval)

        }
    })

}

const bindEvents = function() {
    bindEventMove()

}

const __main = function() {
    let s = square(20)
    drawSquare(s)
    bindEvents()

}

__main()