import React from 'react'
import { themes } from "../config"
import { usePageContext } from "../page-wrapper/PageWrapper"
import Piece from "./Piece"
import Vector from './Vector'
import ChessBlock from './ChessBlock'
import { anime_changeBgColor, anime_moveBlock, setSelected, updateBoard } from './utility'
import { KEY_CHESSBOARD, KEY_CURRENT_THEME, KEY_SELECTED, STATE_CONFIG, STATE_PLAYGROUND } from '../App'
import anime from "animejs/lib/anime.es.js"
import produce from 'immer'

/**
 * @param {Vector} pos 
 * @param {ChessBlock[][]} chessboard 
 */
export const renderPieceAt = (pos, chessboard, _stateName = STATE_PLAYGROUND) => {
    const [pageInfo, setPageState] = usePageContext()
    const { [_stateName]: currState,
        [STATE_CONFIG]: config,
    } = pageInfo
    const { [KEY_SELECTED]: selected } = currState
    const { [KEY_CURRENT_THEME]: currTheme } = config

    const piece = new Piece(themes[currTheme]["piece-color"], pos)

    React.useEffect(() => {
        updateBoard(pageInfo, setPageState, _stateName, KEY_CHESSBOARD, [
            {
                pos: pos,
                piece: piece
            },
        ])
    }, [])

    return (
        <div
            id={`${piece.id}`} key={`${piece.id}`}
            className="chess-piece"
            style={{
                left: pos.convertToPercentPosition(chessboard).left,
                top: pos.convertToPercentPosition(chessboard).top,
                width: `${100 / chessboard.length}%`,
                height: `${100 / chessboard.length}%`,
                backgroundColor: piece.color,
            }}
            onClick={() => {
                if (!selected) {
                    const change = anime_changeBgColor(piece, themes[currTheme]["piece-color-highlight"])
                    anime({ ...change })
                    setSelected(pageInfo, setPageState, _stateName, piece)
                    return
                }
                // console.log(`selected`, selected)
                const change = anime_changeBgColor(piece, piece.color)
                anime({ ...change })
                setSelected(pageInfo, setPageState, _stateName, null)
            }}
        />
    )
}

/**
 * @param {ChessBlock[][]} chessboard 
 */
export const renderChessboard = (chessboard, _stateName = STATE_PLAYGROUND) => {
    const [pageInfo, setPageState] = usePageContext()
    const {
        [_stateName]: currState,
        [STATE_CONFIG]: config
    } = pageInfo
    const { [KEY_SELECTED]: selected } = currState
    const { [KEY_CURRENT_THEME]: currentTheme } = config

    return chessboard.map((arr, x) => {
        return arr.map((elt, y) => {
            const pos = new Vector(x, y)
            const block = new ChessBlock(pos)

            let defaultColor = ""
            if (pos.isXYUniform()) {
                defaultColor = themes[currentTheme]["dark-block"]
            } else {
                defaultColor = themes[currentTheme]["light-block"]
            }

            return (
                <div
                    id={block.id} key={block.id}
                    className={`chess-block`}
                    style={{
                        left: pos.convertToPercentPosition(chessboard).left,
                        top: pos.convertToPercentPosition(chessboard).top,
                        backgroundColor: defaultColor,
                        width: `${100 / chessboard.length}%`,
                        height: `${100 / chessboard.length}%`
                    }}
                    onClick={() => {
                        if (!selected) { return }

                        const move = anime_moveBlock(selected, pos, chessboard)
                        const change = anime_changeBgColor(selected, selected.color)
                        anime({ ...move, ...change })

                        const next = produce(pageInfo, (draft) => {
                            let currPos = selected.currentPos
                            draft[_stateName][KEY_CHESSBOARD][currPos.x][currPos.y] = null
                            draft[_stateName][KEY_CHESSBOARD][pos.x][pos.y] = selected
                            draft[_stateName][KEY_SELECTED] = null
                        })
                        setPageState(next)
                    }}
                    onMouseEnter={() => {
                        anime({
                            targets: `#${block.id}`,
                            background: themes[currentTheme]["highlight-block"],
                            translateY: ".2rem",
                            direction: "normal",
                            easing: "easeInOutSine",
                            duration: 100,
                        })
                    }}
                    onMouseLeave={() => {
                        anime({
                            targets: `#${block.id}`,
                            background: defaultColor,
                            translateY: "0rem",
                            direction: "normal",
                            easing: "easeInOutSine",
                            duration: 100,
                        })
                    }}
                />
            )
        })
    })
}