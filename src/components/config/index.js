export const PIECE = "piece"
export const CHESS_BLOCK = "chess_block"

export const themes = [{
    "chessboard-bg-color": "mediumpurple",
    "position-block": `chartreuse`,
    "attack-block": `tomato`,
    "highlight-block": `#00ffff`,
    "dark-block": `#00fa9a`,
    "light-block": `#ffd700`,
    "coordinates-color": "blue",
},
{
    "chessboard-bg-color": "rosybrown",
    "position-block": "hotpink",
    "highlight-block": "khaki",
    "attack-block": "lime",
    "dark-block": "lightsalmon",
    "light-block": "orangered",
    "coordinates-color": "greenyellow",
},
{
    "chessboard-bg-color": "darkblue",
    "position-block": "lightyellow",
    "highlight-block": "lightskyblue",
    "attack-block": "lightsalmon",
    "dark-block": "lightyellow",
    "light-block": "wheat",
    "coordinates-color": "darkslateblue",
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