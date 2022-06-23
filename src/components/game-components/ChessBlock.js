import { TYPE_CHESS_BLOCK } from "../config"

export default class ChessBlock {
    type
    currentPos
    id
    weights
    constructor(currentPos) {
        this.currentPos = currentPos
        this.type = TYPE_CHESS_BLOCK
        this.id = TYPE_CHESS_BLOCK + "-" + currentPos.convertToId()
    }
}