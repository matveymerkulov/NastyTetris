import {floor} from "../Furca/src/functions.js"
import {emptyTile} from "../Furca/src/tile_map.js"
import {field, score} from "./main.js"


const topTransform =    {8: 4, 9: 5, 10: 6, 11 : 7, 12: 0, 13: 1, 14: 2, 15: 3}
const bottomTransform = {4: 0, 5: 1, 6: 2, 7: 3, 8: 12, 9: 13, 10: 14, 11: 15}

function shiftRow(row, dRow) {
    for(let column = 1; column <= 10; column++) {
        field.setTileByPos(column, row, field.tileByPos(column, row - dRow))
    }
}

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

export function checkLines() {
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