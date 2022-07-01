import React from 'react'
import { themes, TYPE_PIECE } from "../config"
import { usePageContext } from "../page-wrapper/PageWrapper"
import { findSelectedInBoard, setSelected, anime_visualizeSelectPiece, calculateBlockSize } from './utility'
import { KEY_BOARD_SIZE_X, KEY_BOARD_SIZE_Y, KEY_CURRENT_LEVEL, KEY_CURRENT_THEME, KEY_PIECES_BOARD, KEY_SELECTED, STATE_CONFIG, STATE_MAZE_SOLVER } from '../App'
import Vector from './classes/Vector'
import { anime_createObj, anime_executeTimeline } from '../config/utility'

/**
 * @param {obj} param0 
 * @returns {JSX.Element}
 */
export const Pieces = ({ stateName = STATE_MAZE_SOLVER }) => {
    const [app, setAppState] = usePageContext()
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
     * work around with static board solution to prevent re-render piece component
     * when some props of a piece change during animation time */
    const staticPiecesBoard = React.useMemo(() => piecesBoard, [currTheme, currLevel])

    return staticPiecesBoard.map((arr, x) => arr.map((piece, y) => {
        if (!piece || piece.type !== TYPE_PIECE) return null
        const pos = new Vector(x, y)

        return (
            <div /** this div is a PIECE_BLOCK */
                id={`${piece.id}`} key={`${piece.id}`}
                className="chess-piece"
                style={{
                    left: pos.convertToPercentPosition(piecesBoard).left,
                    top: pos.convertToPercentPosition(piecesBoard).top,
                    width: width,
                    height: height,
                    backgroundColor: piece.color,
                    border: ".1rem solid black",
                    borderRadius: '50%',
                }}
                onMouseEnter={() => {
                    const { width, height } = calculateBlockSize(boardSizeX, boardSizeY, 110, 110)
                    let obj = {
                        width: width,
                        height: height,
                    }
                    anime_executeTimeline([anime_createObj(piece.id, obj)])
                }}
                onMouseLeave={() => {
                    const { width, height } = calculateBlockSize(boardSizeX, boardSizeY, 100, 100)
                    let obj = {
                        width: width,
                        height: height,
                    }
                    anime_executeTimeline([anime_createObj(piece.id, obj)])
                }}
                onClick={() => {
                    if (!selected) {
                        /** since user doesn't select anything yet so we have to let user select this piece */
                        const foundSelected = findSelectedInBoard(piece, piecesBoard)

                        anime_visualizeSelectPiece(foundSelected, piecesBoard, currTheme,
                            themes[currTheme]["piece-highlight-color"],
                            themes[currTheme]["main-piece-color"]
                        )

                        foundSelected.setColor(themes[currTheme]["piece-highlight-color"])
                        setSelected(app, setAppState, stateName, foundSelected)
                        return
                    }
                    /** user already selected this piece before so we deselect this */
                    anime_visualizeSelectPiece(selected, piecesBoard, currTheme)

                    selected.setColor(piece.defaultColor)
                    setSelected(app, setAppState, stateName, null)
                }}
            />
        )
    }))
}