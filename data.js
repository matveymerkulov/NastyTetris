import {TileSet} from "../Furca/src/tile_set.js"
import {TileMap} from "../Furca/src/tile_map.js"
import {ImageArray} from "../Furca/src/image_array.js"
import {tileMap, tileMaps, tileSet} from "../Furca/src/project.js"
import {Block} from "../Furca/src/block.js"
import {Category, Pos, Rule} from "../Furca/src/auto_tiling.js"
import {texture} from "../Furca/src/system.js"

export function loadData() {
    tileSet.blocks = new TileSet(new ImageArray(texture.bricks, 4, 14, 0.5, 0.5, 1, 1), [
        1, 1, 1, 0,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        2, 2, 2, 2,
        2, 2, 2, 2,
        2, 2, 2, 2,
        2, 2, 1, 1,
        2, 2, 2, 2,
        2, 2, 2, 2,
        2, 2, 2, 1,
        2, 2, 2, 1,
        0, 0, 0, 0,
        0, 0, 0, 1,
    ], [
        new Block(0, 4, 2, 1, 0), new Block(2, 4, 2, 1, 0),
        new Block(2, 5, 2, 1, 0), new Block(0, 5, 2, 1, 0),
        new Block(0, 6, 2, 1, 0), new Block(2, 6, 2, 1, 0),
        new Block(0, 7, 2, 1, 0), new Block(0, 8, 1, 2, 0),
        new Block(1, 8, 1, 2, 0), new Block(2, 8, 1, 2, 0),
        new Block(3, 8, 1, 2, 0), new Block(2, 10, 1, 2, 0),
        new Block(1, 10, 1, 2, 0), new Block(0, 10, 1, 2, 0),
    ], [
        new Category("blocks", [
            new Rule(3, [new Pos(0, 1), new Pos(1, 0), new Pos(0, -1), new Pos(-1, 0), ]),
            new Rule(0, [new Pos(0, 1), new Pos(-1, 0), new Pos(0, -1), ]),
            new Rule(2, [new Pos(0, -1), new Pos(1, 0), new Pos(0, 1), ]),
            new Rule(7, [new Pos(-1, 0), new Pos(0, -1), new Pos(1, 0), ]),
            new Rule(15, [new Pos(-1, 0), new Pos(0, 1), new Pos(1, 0), ]),
            new Rule(1, [new Pos(0, 1), new Pos(0, -1), ]),
            new Rule(11, [new Pos(-1, 0), new Pos(1, 0), ]),
            new Rule(4, [new Pos(-1, 0), new Pos(0, -1), ]),
            new Rule(6, [new Pos(1, 0), new Pos(0, -1), ]),
            new Rule(12, [new Pos(-1, 0), new Pos(0, 1), ]),
            new Rule(14, [new Pos(0, 1), new Pos(1, 0), ]),
            new Rule(8, [new Pos(-1, 0), ]),
            new Rule(5, [new Pos(0, -1), ]),
            new Rule(10, [new Pos(1, 0), ]),
            new Rule(13, [new Pos(0, 1), ]),
            new Rule(9, []),
        ], false),
    ], -1, [])

    tileMap.field = new TileMap(tileSet.blocks, 12, 24, -1, -8, 1, 1, [
        7,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,   7,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        12,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,  14,
    ])
    tileMap.shape0_0 = new TileMap(tileSet.blocks, 4, 4, -18, -10, 1, 1, [
        -1,  -1,  -1,  -1,
        0,   1,   1,   2,
        -1,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape1_0 = new TileMap(tileSet.blocks, 4, 4, -18, -5, 1, 1, [
        -1,   7,  -1,  -1,
        0,  10,  -1,  -1,
        -1,  15,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape2_0 = new TileMap(tileSet.blocks, 4, 4, -18, 0, 1, 1, [
        -1,   7,  -1,  -1,
        4,  14,  -1,  -1,
        15,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape3_0 = new TileMap(tileSet.blocks, 4, 4, -18, 5, 1, 1, [
        7,  -1,  -1,  -1,
        12,   6,  -1,  -1,
        -1,  15,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape4_0 = new TileMap(tileSet.blocks, 4, 4, -18, 10, 1, 1, [
        0,   6,  -1,  -1,
        -1,  11,  -1,  -1,
        -1,  15,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape5_0 = new TileMap(tileSet.blocks, 4, 4, -18, 15, 1, 1, [
        -1,   4,   2,  -1,
        -1,  11,  -1,  -1,
        -1,  15,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape6_0 = new TileMap(tileSet.blocks, 4, 4, -18, 20, 1, 1, [
        4,   6,  -1,  -1,
        12,  14,  -1,  -1,
        -1,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape0_1 = new TileMap(tileSet.blocks, 4, 4, -13, -10, 1, 1, [
        -1,   7,  -1,  -1,
        -1,  11,  -1,  -1,
        -1,  11,  -1,  -1,
        -1,  15,  -1,  -1,
    ], -1)
    tileMap.shape1_1 = new TileMap(tileSet.blocks, 4, 4, -13, -5, 1, 1, [
        -1,   7,  -1,  -1,
        0,  13,   2,  -1,
        -1,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape1_2 = new TileMap(tileSet.blocks, 4, 4, -8, -5, 1, 1, [
        -1,   7,  -1,  -1,
        -1,   8,   2,  -1,
        -1,  15,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape1_3 = new TileMap(tileSet.blocks, 4, 4, -3, -5, 1, 1, [
        -1,  -1,  -1,  -1,
        0,   5,   2,  -1,
        -1,  15,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape2_1 = new TileMap(tileSet.blocks, 4, 4, -13, 0, 1, 1, [
        -1,   4,   2,  -1,
        0,  14,  -1,  -1,
        -1,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape3_1 = new TileMap(tileSet.blocks, 4, 4, -13, 5, 1, 1, [
        -1,   4,   2,  -1,
        0,  14,  -1,  -1,
        -1,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape4_1 = new TileMap(tileSet.blocks, 4, 4, -13, 10, 1, 1, [
        -1,  -1,   7,  -1,
        0,   1,  14,  -1,
        -1,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape4_2 = new TileMap(tileSet.blocks, 4, 4, -8, 10, 1, 1, [
        -1,   7,  -1,  -1,
        -1,  11,  -1,  -1,
        -1,  12,   2,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape4_3 = new TileMap(tileSet.blocks, 4, 4, -3, 10, 1, 1, [
        -1,  -1,  -1,  -1,
        4,   1,   2,  -1,
        15,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape5_1 = new TileMap(tileSet.blocks, 4, 4, -13, 15, 1, 1, [
        -1,  -1,  -1,  -1,
        0,   1,   6,  -1,
        -1,  -1,  15,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape5_2 = new TileMap(tileSet.blocks, 4, 4, -8, 15, 1, 1, [
        -1,   7,  -1,  -1,
        -1,  11,  -1,  -1,
        0,  14,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)
    tileMap.shape5_3 = new TileMap(tileSet.blocks, 4, 4, -3, 15, 1, 1, [
        7,  -1,  -1,  -1,
        12,   1,   2,  -1,
        -1,  -1,  -1,  -1,
        -1,  -1,  -1,  -1,
    ], -1)

}