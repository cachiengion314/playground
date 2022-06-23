import Piece from "./Piece"
import Vector from './Vector'
import ChessBlock from './ChessBlock'
import { updateProps } from "../config/utility"
import { KEY_SELECTED } from "../App"
import produce from "immer"

const default_springAnime = {
    direction: "normal",
    easing: 'spring(1, 80, 10, 0)',
    duration: 200,
}

/**
 * @param {Piece} selected 
 * @param {Vector} nextPos 
 * @param {ChessBlock[][]} chessboard 
 */
export const anime_moveBlock = (selected, nextPos, chessboard) => {
    return ({
        ...default_springAnime,
        targets: `#${selected.id}`,
        top: nextPos.convertToPercentPosition(chessboard).top,
        left: nextPos.convertToPercentPosition(chessboard).left,
    })
}

/**
 * @param {Piece} selected 
 * @param {string} nextColor 
 */
export const anime_changeBgColor = (selected, nextColor) => {
    return ({
        ...default_springAnime,
        targets: `#${selected.id}`,
        backgroundColor: nextColor,
    })
}

export function setSelected(pageInfo, setPageState, subStateName, selected) {
    updateProps(pageInfo, setPageState, subStateName, [
        {
            key: KEY_SELECTED,
            val: selected
        }
    ])
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