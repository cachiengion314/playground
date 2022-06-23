import ChessBlock from "./ChessBlock"
import { TYPE_PIECE } from "../config"

export default class Piece extends ChessBlock {
    constructor(color, currentPos) {
        super(currentPos)
        this.type = TYPE_PIECE
        this.color = color
        this.id = TYPE_PIECE + "-" + currentPos.convertToId()
    }
    getPossibleMovesScore() {

    }
    getWeights() {
        return this.weights
    }

    getAllPossibleMoves(chessBoard = AssignedVar.currentGame.chessBoard, controllingColor = AssignedVar.currentGame.currentPlayer.color) { }
}