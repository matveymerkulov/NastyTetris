import {field, getShape, shapeColumn, shapeRow, shapesQuantity} from "./main.js"
import {emptyTile} from "../Furca/src/tile_map.js"
import {abs} from "../Furca/src/functions.js"

export function selectShape() {
    let bestShape
    let maxScore = 0
    for(let shapeNum = 0; shapeNum < 7; shapeNum++) {
        let minScore = 2000
        for(let shapePos = 0; shapePos < shapesQuantity[shapeNum]; shapePos++) {
            const shape = getShape(shapeNum, shapePos)
            for(let column = 0; column < 10; column++) {
                let row = -1
                while(true) {
                    if(field.collidesWithTileMap(shape, column, row + 1)) break
                    row++
                }
                if(row < 0) continue
                const score = calculateScore(shape, column, row)
                if(score < minScore) minScore = score
            }
        }
        if(minScore >= maxScore) {
            maxScore = minScore
            bestShape = shapeNum
        }
    }
    //console.log(maxScore)
    return bestShape
}



function calculateScore(shape, column, row) {
    function tileIsFilled(tileColumn, tileRow) {
        return field.tileByPos(tileColumn, tileRow) !== emptyTile
            || shape.tileByPos(tileColumn - column, tileRow - row) !== emptyTile
    }

    let prevHeight
    let score = 1000
    for(let tileColumn = 1; tileColumn <= 10; tileColumn++) {
        let start = false
        let height = 0
        for(let tileRow = 0; tileRow < 24; tileRow++) {
            if(tileIsFilled(tileColumn, tileRow)) {
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
        //console.log(tileColumn + ", " + height + ", " + score)
        prevHeight = height
    }
    row: for(let tileRow = 0; tileRow < 22; tileRow++) {
        for(let tileColumn = 1; tileColumn <= 10; tileColumn++) {
            if(!tileIsFilled(tileColumn, tileRow)) continue row
        }
        score -= 100
    }
    //console.log(score)
    return score
}