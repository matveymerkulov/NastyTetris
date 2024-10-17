import {Action} from "../Furca/src/actions/action.js"
import {apsk} from "../Furca/src/system.js"
import {checkLines} from "./line_clear.js"
import {collision, field, incrementRow, newShape, shape, shapeColumn, shapePos, shapeRow} from "./main.js"

export class Delayed extends Action {
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
        incrementRow()
    }
}