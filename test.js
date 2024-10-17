import {project, tileMap, tileSet} from "../Furca/src/project.js"
import {loadData} from "./data.js"
import {emptyTile, initTileMap, TileMap} from "../Furca/src/tile_map.js"
import {Align, apsk, defaultCanvas, defaultFontSize} from "../Furca/src/system.js"
import {abs, clamp, floor, rndi} from "../Furca/src/functions.js"
import {Key, keys} from "../Furca/src/key.js"
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
import {blocks} from "../Trespasser/tiles.js"
import {collision} from "./main.js"

project.getAssets = () => {
    return {
        texture: ["blocks.png"],
        sound: [],
    }
}

export let field, shape, shapeNum, shapePos, shapeColumn, shapeRow, shapeColor, score = new Num(), scoreLabel
export const shapesQuantity = [2, 4, 2, 2, 4, 4, 1]

project.init = () => {
    loadData()
    initTileMap()

    shape = new TileMap(tileSet.blocks, 4, 4)

    defaultCanvas(12, 22)
    field = tileMap.field.copy()
    field.setPosition(0, -1)

    project.scene.add(field, shape)

    shapeNum = 0
    shapeColumn = 0
    shapePos = 0
    shapeRow = 0
    shapeColor = 16 * (rndi(5) + 1)

    const key = new Key("Space")

    function getShape(num, pos) {
        return tileMap[`shape${num}_${pos}`]
    }

    const startingRow = 0

    function setShapePosition() {
        shape.clear()
        getShape(shapeNum, shapePos).pasteTo(shape)
        shapeRow = startingRow
        while(true) {
            if(field.collidesWithTileMap(shape, shapeColumn, shapeRow + 1)) break
            shapeRow++
        }
        shape.setCorner(field.left + shapeColumn, field.top + shapeRow)
    }
    setShapePosition()

    function calculateScore(shape, column, row) {
        let prevHeight
        let score = 0
        for(let tileColumn = 1; tileColumn <= 10; tileColumn++) {
            let start = false
            let height = 0
            for(let tileRow = 0; tileRow < 24; tileRow++) {
                if(field.tileByPos(tileColumn, tileRow) !== emptyTile
                        || shape.tileByPos(tileColumn - column, tileRow - row) !== emptyTile) {
                    if(!start) {
                        start = true
                        height = tileRow
                    }
                } else if(start) {
                    score += 10
                    break
                }
            }
            if(prevHeight !== undefined) {
                score += abs(height - prevHeight)
            }
            console.log(tileColumn + ", " + height + ", " + score)
            prevHeight = height
        }
        //console.log(score)
        return score
    }

    project.update = () => {
        if(key.wasPressed) {
            while(true) {
                shapePos++
                if(shapePos >= shapesQuantity[shapeNum]) {
                    shapePos = 0
                    shapeColumn++
                    if(shapeColumn > 10) {
                        shapeColumn = 0
                        shapeNum++
                    }
                }
                setShapePosition()
                if(shapeRow !== startingRow) break
            }
            console.log(calculateScore(shape, shapeColumn, shapeRow))
        }
    }
}

