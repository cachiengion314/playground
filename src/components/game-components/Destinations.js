import React from 'react'
import { TYPE_DESTINATION } from '../config'
import { usePageContext } from "../page-wrapper/PageWrapper"
import { anime_visualizeSelectPiece, calculateBlockSize, setSelected } from './utility'
import {
    KEY_BOARD_SIZE_X, KEY_BOARD_SIZE_Y, KEY_CURRENT_LEVEL, KEY_CURRENT_THEME,
    KEY_PIECES_BOARD, KEY_SELECTED, STATE_CONFIG, STATE_MAZE_SOLVER
} from '../App'
import PathNode from './classes/PathNode'
import Vector from './classes/Vector'
import Piece from './classes/Piece'
import { anime_createObj, anime_createMoveObj, anime_executeTimeline, randomBetween, } from '../config/utility'
import { maze_setBoard } from '../maze-page/utility'

/**
 * @param {Piece} selected 
 * @param {Vector} clickedPos 
 * @param {any[][]} piecesBoard 
 * @param {string} currTheme 
 * @param {Function} succesArrivedCallback 
 * @param {Function} failCallback 
 */
export const default_handleDestinationClick = (selected, clickedPos, piecesBoard,
    currTheme, succesArrivedCallback, failCallback) => {
    if (!selected) { return }
    if (selected.isAnimating) { return }

    const moveObjs = PathNode.findRouteTo(
        clickedPos, selected.currentPos, selected, piecesBoard
    )
        .filter((elt, index) => index !== 0)
        .map((move) => {
            return anime_createMoveObj(selected, move, piecesBoard)
        })
    if (moveObjs.length === 0) {
        failCallback && failCallback()
        return
    }
    /** this setIsAnimating below seem anti reactJs pattern but as i've said before
     *  anime library doesn't properly support reactJs so we have to
     *  work around with some mutable-object implements */
    selected.setIsAnimating(true)
    anime_executeTimeline(moveObjs, () => {
        selected.setIsAnimating(false)
        succesArrivedCallback && succesArrivedCallback()
    })
    anime_visualizeSelectPiece(selected, piecesBoard, currTheme)
}

/**
 * 
 * @param {obj} param0 
 * @returns {JSX.Element}
 */
export const Destinations = ({ stateName = STATE_MAZE_SOLVER }) => {
    const [app, setPageState] = usePageContext()
    const {
        [KEY_CURRENT_THEME]: currTheme,
    } = app[STATE_CONFIG]
    const {
        [KEY_SELECTED]: selected,
        [KEY_PIECES_BOARD]: destinationsBoard,
        [KEY_CURRENT_LEVEL]: currLevel,
        [KEY_BOARD_SIZE_X]: boardSizeX,
        [KEY_BOARD_SIZE_Y]: boardSizeY,
    } = app[stateName]
    const { width, height } = calculateBlockSize(boardSizeX, boardSizeY)
    /** since anime library doesn't properly support ReactJs so we have to 
     * work around with static board solution to prevent re-render piece component
     * when some props of a piece change during animation time */
    const staticPiecesBoard = React.useMemo(() => destinationsBoard, [currTheme, currLevel])

    return staticPiecesBoard.map((arr, x) => arr.map((destination, y) => {
        if (!destination || destination.type !== TYPE_DESTINATION) return null
        const pos = new Vector(x, y)

        return (
            <div /** this div is a PIECE_BLOCK */
                id={`${destination.id}`} key={`${destination.id}`}
                className="chess-block"
                style={{
                    left: pos.convertToPercentPosition(destinationsBoard).left,
                    top: pos.convertToPercentPosition(destinationsBoard).top,
                    width: width,
                    height: height,
                    backgroundColor: destination.color,
                    border: ".1rem solid black",
                    borderRadius: "50%",
                    opacity: 1,
                }}
                onMouseEnter={() => {
                    const { width, height } = calculateBlockSize(boardSizeX, boardSizeY, 110, 110)
                    let obj = {
                        width: width,
                        height: height,
                    }
                    anime_executeTimeline([anime_createObj(destination.id, obj)])
                }}
                onMouseLeave={() => {
                    const { width, height } = calculateBlockSize(boardSizeX, boardSizeY, 100, 100)
                    let obj = {
                        width: width,
                        height: height,
                    }
                    anime_executeTimeline([anime_createObj(destination.id, obj)])
                }}
                onClick={() => {
                    default_handleDestinationClick(
                        selected, pos, destinationsBoard, currTheme,
                        () => {
                            let nextX = boardSizeX
                            let nextY = boardSizeY
                            if (boardSizeY < 21) {
                                nextY = boardSizeY + randomBetween([0, 2])
                            }
                            if (boardSizeX < 21) {
                                nextX = boardSizeX + randomBetween([0, 2])
                                if (nextX >= nextY + 6) {
                                    nextY = nextX - 2
                                }
                            }
                            maze_setBoard(nextX, nextY, app, setPageState, currTheme, selected)
                        },
                        () => {
                            setSelected(app, setPageState, stateName, null)
                        }
                    )

                }}
            />
        )
    }))
}