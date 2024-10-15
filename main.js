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

function shiftRow(row, dRow) {
    for(let column = 1; column <= 10; column++) {
        field.setTileByPos(column, row, field.tileByPos(column, row - dRow))
    }
}

const topTransform =    {8: 4, 9: 5, 10: 6, 11 : 7, 12: 0, 13: 1, 14: 2, 15: 3}
const bottomTransform = {4: 0, 5: 1, 6: 2, 7: 3, 8: 12, 9: 13, 10: 14, 11: 15}

function processRow(row, transform) {
    for(let column = 1; column <= 10; column++) {
        const tile = field.tileByPos(column, row)
        const baseTile = tile % 16
        const tileShift = floor(tile / 16)
        const newTile = transform[baseTile]
        if(newTile === undefined) continue
        field.setTileByPos(column, row, newTile + tileShift * 16)
    }
}

function checkLines() {
    let row = 22, dRow = 0, bonus = 0
    main: while(row >= 0) {
        shiftRow(row, dRow)
        for(let column = 1; column <= 10; column++) {
            if(field.tileByPos(column, row) === emptyTile) {
                row--
                continue main
            }
        }
        processRow(row - 1, bottomTransform)
        processRow(row + 1, topTransform)
        bonus += 100
        score.value += bonus
        dRow++
    }
}

class Delayed extends Action {
    time
    duration

    constructor(duration) {
        super()
        this.duration = duration
        this.time = duration
    }

    execute() {
        if(this.time > 0) {
            this.time -= apsk
            return
        }
        this.time = this.duration
        if(collision(0, 1, shapePos)) {
            shape.pasteTo(field, shapeColumn, shapeRow)
            checkLines()
            newShape()
            return
        }
        shapeRow++
    }
}

project.getAssets = () => {
    return {
        texture: ["blocks.png"],
        sound: [],
    }
}

let field, shape, shapeNum, shapePos, shapeColumn, shapeRow, shapeColor, score = new Num(), scoreLabel
const shapesQuantity = [2, 4, 2, 2, 4, 4, 1]

function collision(dColumn, dRow, pos) {
    return field.collidesWithTileMap(getShape(pos), shapeColumn + dColumn, shapeRow + dRow)
}

function newShape() {
    shapeNum = rndi(7)
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

function getShape(pos) {
    return tileMap[`shape${shapeNum}_${pos}`]
}

function initShape(newPos) {
    let newShape = getShape(newPos)
    if(collision(0, 0, newPos)) return
    shapePos = newPos
    shape.clear()
    newShape.pasteTo(shape)
    shape.shiftTiles(shapeColor)
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