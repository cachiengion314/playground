import ChessBlock from "./ChessBlock"
import { PIECE } from "../config"

export default class Piece extends ChessBlock {
    constructor(color, currentPos) {
        super(currentPos)
        this.type = PIECE
        this.color = color
        this.id = PIECE + "-" + currentPos.convertToId()
    }
    getPossibleMovesScore() {

    }
    getWeights() {
        return this.weights
    }

    getAllPossibleMoves(chessBoard = AssignedVar.currentGame.chessBoard, controllingColor = AssignedVar.currentGame.currentPlayer.color) { }
}