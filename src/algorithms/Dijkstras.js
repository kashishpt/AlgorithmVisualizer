let obstacles = []
let start = null
let target = null
let targetPicked = false
let startPicked = false

export function erase(id) {
    if (id != null) {
        let element = document.getElementById(id)
        if (id == start) {
            start = null
            startPicked = false
        }
        else if (id == target) {
            target = null
            targetPicked = false
        }
        else if (obstacles.includes(id)) {
            obstacles = obstacles.filter(function(value) {
                return value != id
            })
        }
        element.style.backgroundColor = 'lightgray'
        element.style.borderRadius = '0%'
        element.style.opacity = '100%'
        element.style.border = ''
    }
}

export function addObstacle(id) {
    erase(id)
    obstacles.push(id)
    document.getElementById(id).style.backgroundColor = 'black'
}

export function setStart(id) {
    erase(id)
    erase(start)

    startPicked = true
    start = id
    let element = document.getElementById(id)
    element.style.borderRadius = '100%'
    element.style.backgroundColor = 'blue'
}

export function setTarget(id) {
    erase(id)
    erase(target)
    targetPicked = true
    target = id
    let element = document.getElementById(id)
    element.style.backgroundColor = 'red'
    element.style.borderRadius = '100%'
}




export function dijkstras(maxHeight, maxWidth) {

    if (!targetPicked) {
        alert('You must select a target!')
        return;
    }
    else if(!startPicked) {
        alert('You must select a starting point!')
        return;
    }

    // turns off all the buttons so user can't click one while the algoritm is running
    for (let button of document.querySelectorAll('button')) {
        button.disabled = true
    }




    let processed = new Set()
    let predecessors = new Map()
    let costs = new Map()

    // initalizes predecessors and costs
    // adds each vertex to predecessors with a null value
    // adds each vertex to costs with max cost for all vertices except the start
    for (let x = 0; x < maxWidth; x++) {
        for (let y = 0; y < maxHeight; y++) {
            let cur = x + ',' + y
            if (!obstacles.includes(cur)) {
                predecessors.set(cur, null)
                costs.set(cur, maxHeight * maxHeight + 1)
                let element = document.getElementById(cur)
                if (cur != target && !obstacles.includes(cur) && cur != start) {
                    erase(cur)
                }
            }
        }
    }
    costs.set(start, 0)

    // heart of the algorithm; processes each neighbor
    let i = 0
    while (!processed.has(target) && processed.size < maxHeight * maxWidth - obstacles.length) {
        let cur = findMin(processed, costs, maxHeight, maxWidth)
        processed.add(cur)
        let neighbors = [
            getNorth(cur, maxHeight),
            getSouth(cur),
            getEast(cur, maxWidth),
            getWest(cur),
            getNE(cur, maxWidth, maxHeight),
            getSW(cur),
            getSE(cur, maxWidth),
            getNW(cur, maxHeight)
        ]

        for (let neighbor of neighbors) {
            let coordinate = neighbor.coordinate
            let cost = neighbor.cost
            if (!processed.has(coordinate)) {
                if (costs.get(coordinate) > costs.get(cur) + cost) {
                    costs.set(coordinate, costs.get(cur) + cost)
                    predecessors.set(coordinate, cur)
                }
                setTimeout(() => {
                
                    let curProcessed = document.getElementById(neighbor.coordinate)
                    if (neighbor.coordinate != start && !obstacles.includes(neighbor.coordinate)) {
                        curProcessed.style.backgroundColor = '#a3ffba'
                    }
                }, i++/5)
            }

            // changes the color of the searched vertices
        }
    }

    // changes the color of the correct path
    let curVertexLoop = target
    let curVertex = curVertexLoop
    let j = 0
    let newColor = '#681adb'
    let opaque = 50
    while (curVertexLoop != null) {
        setTimeout(() => {
            let element = document.getElementById(curVertex)
            if (curVertex == target) {
                element.style.backgroundColor = 'red'
                element.style.border = newColor + ' solid 4px'
            }
            else if (curVertex != start) {
                element.style.backgroundColor = newColor
                element.style.opacity = opaque + '%'
                element.style.borderRadius = '30%'
                opaque += 2
            }
            else {
                element.style.border = newColor + ' solid 4px'
            }
            curVertex = predecessors.get(curVertex)
        }, i/5 + 13*j)
        curVertexLoop = predecessors.get(curVertexLoop)
        j++
    }

    // enables the buttons again
    setTimeout(() => {
        for (let button of document.querySelectorAll('button')) {
            button.disabled = false
        }
    }, i/5 + 13*j + 1)



}

function getNorth(center, maxHeight) {
    let y = parseInt(center.substring(center.indexOf(',') + 1))
    let newString = center.substring(0, center.indexOf(',') + 1) + (y+1)
    return {
        coordinate: y < maxHeight - 1 && !obstacles.includes(newString) ? newString : center,
        cost: 1
    }
}
function getSouth(center) {
    let y = parseInt(center.substring(center.indexOf(',') + 1))
    let newString = center.substring(0, center.indexOf(',') + 1) + (y-1)
    return {
        coordinate: y > 0 && !obstacles.includes(newString) ? newString : center,
        cost: 1
    }
}
function getEast(center, maxWidth) {
    let x = parseInt(center.substring(0, center.indexOf(',')))
    let newString = (x+1) + center.substring(center.indexOf(','))
    return {
        coordinate: x < maxWidth - 1 && !obstacles.includes(newString) ? newString : center,
        cost: 1
    }
}
function getWest(center) {
    let x = parseInt(center.substring(0, center.indexOf(',')))
    let newString = (x-1) + center.substring(center.indexOf(','))
    return {
        coordinate: x > 0 && !obstacles.includes(newString) ? newString : center,
        cost: 1
    }
}

function getNW(center, maxHeight) {
    let west = getWest(center).coordinate
    let north = getNorth(center, maxHeight).coordinate
    return {
        coordinate: west.substring(0, west.indexOf(',')) + north.substring(north.indexOf(',')),
        cost: 1
    }
}

function getNE(center, maxWidth, maxHeight) {
    let east = getEast(center, maxWidth).coordinate
    let north = getNorth(center, maxHeight).coordinate
    return {
        coordinate: east.substring(0, east.indexOf(',')) + north.substring(north.indexOf(',')),
        cost: 1.41
    }
}

function getSW(center) {
    let west = getWest(center).coordinate
    let south = getSouth(center).coordinate
    return {
        coordinate: west.substring(0, west.indexOf(',')) + south.substring(south.indexOf(',')),
        cost: 1.41
    }
}

function getSE(center, maxWidth) {
    let east = getEast(center, maxWidth).coordinate
    let south = getSouth(center).coordinate
    return {
        coordinate: east.substring(0, east.indexOf(',')) + south.substring(south.indexOf(',')),
        cost: 1.41
    }
}

function findMin(processed, costs, maxHeight, maxWidth) {
    let min = maxHeight * maxWidth + 2
    let minVertex = null
    for (let key of costs.keys()) {
        if (!processed.has(key)) {
            if (costs.get(key) < min) {
                min = costs.get(key)
                minVertex = key
            }
        }
    }

    return minVertex
}