import React from 'react'
import { usePageContext } from "../page-wrapper/PageWrapper"
import {
    KEY_BOARD_SIZE_X, KEY_BOARD_SIZE_Y, KEY_CURRENT_LEVEL, KEY_CURRENT_THEME,
    KEY_PIECES_BOARD, KEY_SELECTED, STATE_CONFIG, STATE_MAZE_SOLVER
} from '../App'
import { anime_createObj, getBlockColorFrom, anime_executeTimeline } from '../config/utility'
import ChessBlock from './classes/ChessBlock'
import Vector from './classes/Vector'
import { default_handleDestinationClick } from './Destinations'
import produce from 'immer'
import { calculateBlockSize } from './utility'
import PathNode from './classes/PathNode'
import { themes } from '../config'

/**
 * @param {obj} param0 
 * @returns {JSX.Element}
 */
export const Chessboard = ({ stateName = STATE_MAZE_SOLVER }) => {
    const [app, setPageState] = usePageContext()
    const {
        [KEY_CURRENT_THEME]: currTheme,
    } = app[STATE_CONFIG]
    const {
        [KEY_SELECTED]: selected,
        [KEY_PIECES_BOARD]: piecesBoard,
        [KEY_CURRENT_LEVEL]: currLevel,
        [KEY_BOARD_SIZE_X]: boardSizeX,
        [KEY_BOARD_SIZE_Y]: boardSizeY,
    } = app[stateName]
    const { width, height } = calculateBlockSize(boardSizeX, boardSizeY)
    /** since anime library doesn't properly support ReactJs so we have to 
     * work around with static board solution to prevent re-render block component
     * when some props of a block change during animation time */
    const staticChessboard = React.useMemo(() => piecesBoard, [currTheme, currLevel])

    return staticChessboard.map((arr, x) => {
        return arr.map((_elt, y) => {
            const pos = new Vector(x, y)
            const block = new ChessBlock(pos, getBlockColorFrom(pos, currTheme))

            return (
                <div /** this div is a BOARD_BLOCK */
                    id={block.id} key={block.id}
                    className={`chess-block`}
                    style={{
                        left: pos.convertToPercentPosition(staticChessboard).left,
                        top: pos.convertToPercentPosition(staticChessboard).top,
                        width: width,
                        height: height,
                        backgroundColor: block.color,
                    }}

                    onMouseEnter={() => {
                        if (!selected) {
                            let obj = { scale: .95, translateY: ".25rem", opacity: "1", }
                            anime_executeTimeline([anime_createObj(block.id, obj)])
                            return
                        }

                        // const positions = PathNode.findRouteTo(pos, selected.currentPos, selected, piecesBoard)
                        // const objs = positions
                        //     .filter((elt, index) => index !== 0)
                        //     .map((move) => {
                        //         return anime_createObj(ChessBlock.getBlockIdOf(move), {
                        //             backgroundColor: themes[currTheme]["block-highlight-color"],
                        //             opacity: 1,
                        //         })
                        //     })
                        // selected.moves = positions
                        // anime_executeTimeline(objs)
                    }}
                    onMouseLeave={() => {
                        if (!selected) {
                            let obj = { scale: 1, translateY: "0", opacity: block.defaultOpacity, }
                            anime_executeTimeline([anime_createObj(block.id, obj)])
                            return
                        }

                        // const moves = selected.moves
                        // const objs = moves.map((move) => {
                        //     return anime_createObj(ChessBlock.getBlockIdOf(move), {
                        //         backgroundColor: getBlockColorFrom(move, 0),
                        //         opacity: ChessBlock.getDefaultOpacity(),
                        //     })
                        // })
                        // anime_executeTimeline(objs)
                    }}
                    onClick={() => {
                        default_handleDestinationClick(
                            selected, pos, piecesBoard, currTheme,
                            () => {
                                const nextState = produce(app, (draft) => {
                                    draft[stateName][KEY_PIECES_BOARD][selected.currentPos.x][selected.currentPos.y] = 0
                                    selected.setCurrentPos(pos)
                                    draft[stateName][KEY_PIECES_BOARD][pos.x][pos.y] = selected
                                    draft[stateName][KEY_SELECTED] = null
                                })
                                setPageState(nextState)
                            },
                            () => {
                                setSelected(app, setPageState, stateName, null)
                            }
                        )
                    }}
                />
            )
        })
    })
}