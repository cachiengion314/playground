import ChessBlock from "./ChessBlock"
import { themes, TYPE_OBSTACLE, TYPE_PIECE } from "../../config"
import Vector from "./Vector"

export default class Piece extends ChessBlock {
    /**
     * @param {Vector} currentPos 
     * @param {string} color 
     */
    constructor(currentPos, color) {
        super(currentPos, color)
        this.type = TYPE_PIECE
        this.id = TYPE_PIECE + "-" + currentPos.convertToId()
        this.directions = [
            new Vector(0, 1), new Vector(1, 0), new Vector(0, -1), new Vector(-1, 0),
        ]
    }
    /**
     * @param {Vector} _postion - optional
     * @param {string} _color - optional
     * @returns {Piece}
     */
    getClone(_postion, _color) {
        if (_postion) {
            return new Piece(_postion, _color ? _color : this.color)
        }
        return new Piece(this.currentPos, this.color)
    }
    /**
     * @param {any[][]} board 
     * @returns {Vector[]}
     */
    getClosestPossibleMoves(board) {
        const possibleMoves = []

        for (const vector of this.directions) {
            const newMovePos = this.currentPos.plus(vector)
            if (!newMovePos.isPositionOnTheBoard(board)) { continue }

            const potentialPiece = board[newMovePos.x][newMovePos.y]
            if (potentialPiece && potentialPiece.type === TYPE_OBSTACLE) { continue }

            possibleMoves.push(newMovePos)
        }
        return possibleMoves
    }
    /**
     * @param {any[][]} board 
     * @returns {Vector[]}
     */
    getAllPossibleMoves(board) {
        const possibleMoves = []

        for (let vector of this.directions) {
            for (let i = 1; i < 8; ++i) {
                let newMovePos = this.currentPos.plus(vector.multipliBy(i))
                if (newMovePos.isPositionOnTheBoard(board)) {
                    possibleMoves.push(newMovePos)
                }
            }
        }
        return possibleMoves
    }
    /**
     * @param {any[][]} board 
     * @param {number} _currTheme - optional
     * @param {Function} _callback - optional
     * @example
     *      Piece.generateFrom(piecesBoard, currTheme, (piecePos) => {
                anime_executeTimeline([
                    anime_createObj(selected.id,
                        {
                            left: piecePos.convertToPercentPosition().left,
                            top: piecePos.convertToPercentPosition().top
                        })
                ])
            })
     */
    static generateFrom(board, _currTheme = 0, _callback = (piecePos = new Vector(0, 0)) => { }) {
        const defaultPos = new Vector(0, 0)
        const mainPiece = new Piece(defaultPos, themes[_currTheme]["main-piece-color"])
        board[defaultPos.x][defaultPos.y] = mainPiece

        _callback && _callback(defaultPos)
        return board
    }
}