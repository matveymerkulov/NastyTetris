import {project, tileMap, tileSet} from "../Furca/src/project.js"
import {loadData} from "./data.js"
import {emptyTile, initTileMap, TileMap} from "../Furca/src/tile_map.js"
import {Align, apsk, defaultCanvas, defaultFontSize} from "../Furca/src/system.js"
import {clamp, floor, rndi} from "../Furca/src/functions.js"
import {keys} from "../Furca/src/key.js"
import {moveDown, moveLeft, moveRight, turnClockwise, turnCounterclockwise} from "./keys.js"
import {turnTileMapClockwise, turnTileMapCounterclockwise} from "../Furca/src/tile_map_transform.js"
import {enframe} from "../Furca/src/auto_tiling.js"
import {Action} from "../Furca/src/actions/action.js"
import {Layer} from "../Furca/src/layer.js"
import {Label} from "../Furca/src/gui/label.js"
import {Num} from "../Furca/src/variable/number.js"
import {Box} from "../Furca/src/box.js"
import {checkLines} from "./line_clear.js"
import {Delayed} from "./delayed.js"
import {selectShape} from "./select_shape.js"

project.getAssets = () => {
    return {
        texture: ["blocks.png"],
        sound: [],
    }
}

export let field, shape, shapeNum, shapePos, shapeColumn, shapeRow, shapeColor, score = new Num(), scoreLabel
export const shapesQuantity = [2, 4, 2, 2, 4, 4, 1]

export function collision(dColumn, dRow, pos) {
    return field.collidesWithTileMap(getShape(shapeNum, pos), shapeColumn + dColumn, shapeRow + dRow)
}

export function newShape() {
    shapeNum = selectShape()
    shapePos = 0
    shapeColumn = 5
    shapeRow = 0
    shapeColor = 16 * (rndi(5) + 1)
    if(collision(0, 0, 0)) {
        alert("GAME OVER!")
        field.clear()
        tileMap.field.pasteTo(field)
        return
    }
    initShape(0)
}

export function getShape(num, pos) {
    return tileMap[`shape${num}_${pos}`]
}

export function initShape(newPos) {
    let newShape = getShape(shapeNum, newPos)
    if(collision(0, 0, newPos)) return
    shapePos = newPos
    shape.clear()
    newShape.pasteTo(shape)
    shape.shiftTiles(shapeColor)
}

export function incrementRow() {
    shapeRow++
}

project.init = () => {
    scoreLabel = new Label(new Box(0, 0, 12, 20), ["SCORE: ", score]
        , defaultFontSize, Align.center, Align.top)

    loadData()
    initTileMap()

    shape = new TileMap(tileSet.blocks, 4, 4)

    defaultCanvas(12, 22)
    field = tileMap.field.copy()
    field.setPosition(0, -1)
    newShape()

    project.scene.add(field, shape, scoreLabel)

    const movementHandler = new Delayed(0.5)

    project.update = () => {
        movementHandler.execute()
        shape.setCorner(field.left + shapeColumn, field.top + shapeRow)

        function turn(d) {
            const quantity = shapesQuantity[shapeNum]
            initShape((quantity + shapePos + d) % quantity)
        }

        if(turnClockwise.wasPressed) {
            turn(1)
        }
        if(turnCounterclockwise.wasPressed) {
            turn(-1)
        }

        if(moveLeft.wasPressed) {
            if(!collision(-1, 0, shapePos)) shapeColumn--
        }
        if(moveRight.wasPressed) {
            if(!collision(1, 0, shapePos)) shapeColumn++
        }

        if(moveDown.isDown) {
            if(movementHandler.duration !== 0.1) movementHandler.time = 0
            movementHandler.duration = 0.1
        } else {
            movementHandler.duration = 0.5
        }
    }
}