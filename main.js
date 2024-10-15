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

function collision(dColumn, dRow) {
    return field.collidesWithTileMap(shapeMap, shapeColumn + dColumn, shapeRow + dRow)
}

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

            if(collision(0, 1)) {
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
        texture: ["bricks.png"],
        sound: [],
    }
}

let field, shapeMap, shapes, shapeNum, shapePosNum, shapeColumn, shapeRow
const shapesQuantity = [2, 4, 2, 2, 4, 4, 1]

function newShape() {
    shapeNum = rndi(7)
    shapePosNum = 0
    shapeColumn = 4
    shapeRow = 0
    initShape()
}

function initShape() {
    shapeMap.clear()
    tileMap[`shape${shapeNum}_${shapePosNum}`].pasteTo(shapeMap)
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
            shapePosNum = (quantity + shapePosNum + d) % quantity
            initShape()
        }

        if(turnClockwise.wasPressed) {
            changeAngle(1)
        }
        if(turnCounterclockwise.wasPressed) {
            changeAngle(-1)
        }

        if(moveLeft.wasPressed) {
            if(!collision(-1, 0)) shapeColumn--
        }
        if(moveRight.wasPressed) {
            if(!collision(1, 0)) shapeColumn++
        }
    }
}