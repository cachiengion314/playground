import produce from "immer"
import Piece from "./classes/Piece"
import ChessBlock from './classes/ChessBlock'
import { anime_createObj, anime_executeTimeline, getBlockColorFrom, updateProps } from "../config/utility"
import { KEY_SELECTED } from "../App"
import Vector from "./classes/Vector"

export function calculateBlockSize(boardSizeX, boardSizeY, _percentX = 100, _percentY = 100) {
    return ({
        width: `${_percentX / boardSizeX}%`,
        height: `${_percentY / boardSizeY}%`,
    })
}

export function logBoard(chessBoard) {
    let str = ``
    for (let y = 0; y < 8; ++y) {
        for (let x = 0; x < 8; ++x) {
            let block = ``
            if (chessBoard[x][y] && chessBoard[x][y]?.type == TYPE_PIECE) {
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

export function setSelected(pageInfo, setPageState, subStateName, selected) {
    updateProps(pageInfo, setPageState, subStateName, [
        {
            key: KEY_SELECTED,
            val: selected
        },
    ])
}

/**
 * @param {Piece} pieceNeedToFind 
 * @param {any[][]} board 
 */
export function findSelectedInBoard(pieceNeedToFind, board) {
    return board[pieceNeedToFind.currentPos.x][pieceNeedToFind.currentPos.y]
}

/**
 * @param {object} app 
 * @param {Function} setAppState 
 * @param {string} subStateName 
 * @param {string} KEY_BOARD 
 * @param {object[]} positions 
 * @example
 *     updateBoard(pageInfo, setPageState, _stateName, KEY_CHESSBOARD, [
            {
                pos: pos,
                piece: piece
            },
        ])
 */
export function updateBoard(app, setAppState, subStateName, KEY_BOARD, positions) {
    const nextState = produce(app, draftState => {
        for (let i = 0; i < positions.length; ++i) {
            const { pos, piece } = positions[i]
            draftState[subStateName][KEY_BOARD][pos.x][pos.y] = piece
        }
    })
    setAppState(nextState)
}

/**
 * @param {Piece} piece 
 * @param {any[][]} piecesBoard 
 * @param {number} currentTheme 
 * @param {string} pieceNextColor - optional - can omitt when we just want it return to default color
 * @param {string} blockNextColor - optional - can omitt when we just want it return to default color
 */
export function anime_visualizeSelectPiece(piece, piecesBoard, currentTheme, pieceNextColor, blockNextColor) {
    let anime_obj = anime_createObj(piece.id, {
        backgroundColor: pieceNextColor ? pieceNextColor : piece.defaultColor,
        duration: 300,
    })
    anime_executeTimeline([anime_obj])

    const moves = piece.getClosestPossibleMoves(piecesBoard)
    anime_lightUpBlocksFor(moves, blockNextColor, currentTheme)
}

/**
 * 
 * @param {Vector[]} positions 
 * @param {string} lightUpColor 
 * @param {string} _currTheme 
 */
export function anime_lightUpBlocksFor(positions, lightUpColor, _currTheme = 0) {
    for (let i = 0; i < positions.length; ++i) {
        const currId = ChessBlock.getBlockIdOf(positions[i])
        if (!lightUpColor) {
            const default_blockColor = getBlockColorFrom(positions[i], _currTheme)
            let anime_obj = anime_createObj(currId, {
                duration: 300,
                opacity: ChessBlock.getDefaultOpacity(),
                backgroundColor: default_blockColor,
            })
            anime_executeTimeline([anime_obj])
            continue
        }
        let anime_obj = anime_createObj(currId, {
            duration: 300,
            opacity: 1,
            backgroundColor: lightUpColor,
        })
        anime_executeTimeline([anime_obj])
    }
}