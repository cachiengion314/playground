import ChessBlock from "./ChessBlock"
import { themes, TYPE_DESTINATION } from "../../config"
import Vector from "./Vector"

export default class Destination extends ChessBlock {
    constructor(currentPos, color = "#7fff00") {
        super(currentPos, color)
        this.type = TYPE_DESTINATION
        this.id = TYPE_DESTINATION + "-" + currentPos.convertToId()
    }
    /**
     * @param {Vector} _newPos 
     * @param {string} _newColor 
     * @returns 
     */
    getClone(_newPos, _newColor) {
        if (_newPos) {
            return new Destination(_newPos, _newColor ? _newColor : this.color)
        }
        return new Destination(this.currentPos, this.color)
    }
    /**
     * @param {any[][]} board 
     * @param {number} _currTheme - optional
     */
    static generateFrom(board, _currTheme = 0) {
        for (let x = board.length - 1; x >= 0; --x) {
            for (let y = board[x].length - 1; y >= 0; --y) {
                if (!board[x][y]) {
                    board[x][y] = new Destination(new Vector(x, y), themes[_currTheme]["destinattion-color"])
                    return board
                }
            }
        }
        return board
    }
}