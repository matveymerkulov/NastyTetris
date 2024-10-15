import {project, tileMap, tileSet} from "../Furca/src/project.js"
import {loadData} from "./data.js"
import {initTileMap, TileMap} from "../Furca/src/tile_map.js"
import {defaultCanvas} from "../Furca/src/system.js"
import {clamp, rndi} from "../Furca/src/functions.js"
import {keys} from "../Furca/src/key.js"
import {moveLeft, moveRight, turnClockwise, turnCounterclockwise} from "./keys.js"
import {turnTileMapClockwise, turnTileMapCounterclockwise} from "../Furca/src/tile_map_transform.js"
import {enframe} from "../Furca/src/auto_tiling.js"
import {Action} from "../Furca/src/actions/action.js"
import {Layer} from "../Furca/src/layer.js"

class Delayed extends Action {
    time
    #startingTime
    duration = 200

    constructor() {
        super()
        this.#startingTime = new Date().getTime()
    }

    execute() {
        const time = this.#startingTime + this.duration
        const currentTime = new Date().getTime()
        if(currentTime > time + this.duration) {
            this.#startingTime = time

            if(collision(0, 1, shapePos)) {
                shapeMap.pasteTo(field, shapeColumn, shapeRow)
                newShape()
                return
            }
            shapeRow++
        }
    }
}

project.getAssets = () => {
    return {
        texture: ["blocks.png"],
        sound: [],
    }
}

let field, shapeMap, shapes, shapeNum, shapePos, shapeColumn, shapeRow, shapeColor
const shapesQuantity = [2, 4, 2, 2, 4, 4, 1]

function collision(dColumn, dRow, pos) {
    return field.collidesWithTileMap(getShape(pos), shapeColumn + dColumn, shapeRow + dRow)
}

function newShape() {
    shapeNum = rndi(7)
    shapePos = 0
    shapeColumn = 4
    shapeRow = 0
    shapeColor = 16 * (rndi(5) + 1)
    initShape(0)
}

function getShape(pos) {
    return tileMap[`shape${shapeNum}_${pos}`]
}

function initShape(newPos) {
    let newShape = getShape(newPos)
    if(collision(0, 0, newPos)) return
    shapePos = newPos
    shapeMap.clear()
    newShape.pasteTo(shapeMap)
    shapeMap.shiftTiles(shapeColor)
}

project.init = () => {
    loadData()
    initTileMap()

    shapeMap = new TileMap(tileSet.blocks, 4, 4)

    defaultCanvas(12, 22)
    field = tileMap.field.copy()
    field.setPosition(0, -1)
    newShape()

    project.scene.add(field, shapeMap)

    const movementHandler = new Delayed()

    project.update = () => {
        movementHandler.execute()
        shapeMap.setCorner(field.left + shapeColumn, field.top + shapeRow)

        function changeAngle(d) {
            const quantity = shapesQuantity[shapeNum]
            initShape((quantity + shapePos + d) % quantity)
        }

        if(turnClockwise.wasPressed) {
            changeAngle(1)
        }
        if(turnCounterclockwise.wasPressed) {
            changeAngle(-1)
        }

        if(moveLeft.wasPressed) {
            if(!collision(-1, 0, shapePos)) shapeColumn--
        }
        if(moveRight.wasPressed) {
            if(!collision(1, 0, shapePos)) shapeColumn++
        }
    }
}