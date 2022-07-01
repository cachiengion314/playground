import { TYPE_CHESS_BLOCK } from "../../config"
import Vector from "./Vector"

export default class ChessBlock {
    constructor(currentPos = new Vector(99, 99), color = "#f1c692") {
        this.id = TYPE_CHESS_BLOCK + "-" + currentPos.convertToId()
        this.currentPos = currentPos
        this.type = TYPE_CHESS_BLOCK
        this.color = color
        this.defaultColor = color
        this.defaultOpacity = .5
        this.isAnimating = false
    }
    setIsAnimating(val) {
        this.isAnimating = val
    }
    setColor(val) {
        this.color = val
    }
    setCurrentPos(nextPos) {
        this.currentPos = nextPos
    }
    static getDefaultOpacity() {
        return new ChessBlock().defaultOpacity
    }
    /**
     * @param {Vector} pos  
     */
    static getBlockIdOf(pos) {
        return TYPE_CHESS_BLOCK + "-" + pos.convertToId()
    }
}