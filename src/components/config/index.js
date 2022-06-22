export const PIECE = "piece"
export const CHESS_BLOCK = "chess_block"

export const themes = [{
    "chessboard-bg-color": "#9370d8",
    "position-block": `#7fff00`,
    "attack-block": `#ff6347`,
    "highlight-block": `#00ffff`,
    "dark-block": `#00fa9a`,
    "light-block": `#ffd700`,
    "coordinates-color": "#0000ff",

    "piece-color": "#dd7676",
    "piece-color-highlight": "#ffdd94",
},
{
    "chessboard-bg-color": "rosybrown",
    "position-block": "hotpink",
    "highlight-block": "khaki",
    "attack-block": "lime",
    "dark-block": "lightsalmon",
    "light-block": "orangered",
    "coordinates-color": "greenyellow",

    "piece-color": "#dd7676",
    "piece-color-highlight": "#ffdd94",
},
{
    "chessboard-bg-color": "darkblue",
    "position-block": "lightyellow",
    "highlight-block": "lightskyblue",
    "attack-block": "lightsalmon",
    "dark-block": "lightyellow",
    "light-block": "wheat",
    "coordinates-color": "darkslateblue",

    "piece-color": "#dd7676",
    "piece-color-highlight": "#ffdd94",
}]

export function logBoard(chessBoard) {
    let str = ``
    for (let y = 0; y < 8; ++y) {
        for (let x = 0; x < 8; ++x) {
            let block = ``
            if (chessBoard[x][y].type == PIECE) {
                block = `[ ${chessBoard[x][y].id}]`
            } else {
                block = `[          ]`
            }
            if (x == 7) {
                str += ` ${block} \n`
            } else {
                str += ` ${block}`
            }
        }
    }
    console.log(str)
}