import { CHESS_BLOCK } from "../config"

export default class ChessBlock {
    type
    currentPos
    id
    weights
    constructor(currentPos) {
        this.currentPos = currentPos
        this.type = CHESS_BLOCK
        this.id = CHESS_BLOCK + "-" + currentPos.convertToId()
    }
}