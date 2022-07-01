import React from 'react'
import { usePageContext } from "../page-wrapper/PageWrapper"
import { KEY_BOARD_SIZE_X, KEY_BOARD_SIZE_Y, KEY_CURRENT_LEVEL, KEY_CURRENT_THEME, KEY_PIECES_BOARD, STATE_CONFIG, STATE_MAZE_SOLVER } from '../App'
import Vector from './classes/Vector'
import { TYPE_OBSTACLE } from '../config'
import { anime_createObj, anime_executeTimeline } from '../config/utility'
import { calculateBlockSize } from './utility'

/**
 * @param {obj} param0 
 * @returns {JSX.Element}
 */
export const Obstacles = ({ stateName = STATE_MAZE_SOLVER }) => {
    const [app] = usePageContext()
    const {
        [KEY_CURRENT_THEME]: currTheme,
    } = app[STATE_CONFIG]
    const {
        [KEY_PIECES_BOARD]: obstaclesBoard,
        [KEY_CURRENT_LEVEL]: currLevel,
        [KEY_BOARD_SIZE_X]: boardSizeX,
        [KEY_BOARD_SIZE_Y]: boardSizeY,
    } = app[stateName]
    const { width, height } = calculateBlockSize(boardSizeX, boardSizeY)
    /** since anime library doesn't properly support ReactJs so we have to 
     * work around with static board solution to prevent re-render piece component
     * when some props of a piece change during animation time */
    const staticPiecesBoard = React.useMemo(() => obstaclesBoard, [currTheme, currLevel])

    return staticPiecesBoard.map((arr, x) => arr.map((obstacle, y) => {
        if (!obstacle || obstacle.type !== TYPE_OBSTACLE) return null
        const pos = new Vector(x, y)

        return (
            <div /** this div is a PIECE_BLOCK */
                id={`${obstacle.id}`} key={`${obstacle.id}`}
                className="chess-piece"
                style={{
                    left: pos.convertToPercentPosition(obstaclesBoard).left,
                    top: pos.convertToPercentPosition(obstaclesBoard).top,
                    width: width,
                    height: height,
                    backgroundColor: obstacle.color,
                    border: ".1rem solid black",
                }}
                onMouseEnter={() => {
                    let obj = { borderRadius: '50%', }
                    anime_executeTimeline([anime_createObj(obstacle.id, obj)])
                }}
                onMouseLeave={() => {
                    let obj = { borderRadius: 0, }
                    anime_executeTimeline([anime_createObj(obstacle.id, obj)])
                }}
            />
        )
    }))
}