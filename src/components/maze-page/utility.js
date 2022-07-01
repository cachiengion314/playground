import produce from "immer"
import { KEY_BOARD_SIZE_X, KEY_BOARD_SIZE_Y, KEY_CURRENT_LEVEL, KEY_PIECES_BOARD, KEY_SELECTED, STATE_MAZE_SOLVER } from "../App"
import { anime_createObj, anime_executeTimeline } from "../config/utility"
import Destination from "../game-components/classes/Destination"
import Obstacle from "../game-components/classes/Obstacle"
import Piece from "../game-components/classes/Piece"

/**
 * @param {number} boardSizeX 
 * @param {number} boardSizeY 
 * @param {string} theme 
 * @param {Piece} _selected - optional
 */
export function maze_generatePiecesFrom(boardSizeX, boardSizeY, theme, _selected) {
    const board = new Array(boardSizeX).fill(0)
        .map((_elt, x) => new Array(boardSizeY).fill(0)
            .map((__elt, y) => 0)
        )
    Obstacle.generateFrom(board, theme)
    Piece.generateFrom(board, theme, (piecePos) => {
        if (!_selected) return

        const anime_obj = anime_createObj(_selected.id,
            {
                left: piecePos.convertToPercentPosition().left,
                top: piecePos.convertToPercentPosition().top
            })
        anime_executeTimeline([anime_obj])
    })
    Destination.generateFrom(board, theme)
    return board
}

/**
 * 
 * @param {number} boardSizeX 
 * @param {number} boardSizeY 
 * @param {object} app 
 * @param {Function} setAppState 
 * @param {string} theme 
 * @param {Piece} selected 
 */
export function maze_setBoard(boardSizeX, boardSizeY, app, setAppState, theme, _selected) {
    const nextState = produce(app, (draft) => {
        draft[STATE_MAZE_SOLVER][KEY_PIECES_BOARD] = maze_generatePiecesFrom(boardSizeX, boardSizeY, theme, _selected)

        draft[STATE_MAZE_SOLVER][KEY_CURRENT_LEVEL]++
        draft[STATE_MAZE_SOLVER][KEY_BOARD_SIZE_X] = boardSizeX
        draft[STATE_MAZE_SOLVER][KEY_BOARD_SIZE_Y] = boardSizeY

        draft[STATE_MAZE_SOLVER][KEY_SELECTED] = null
    })
    setAppState(nextState)
}