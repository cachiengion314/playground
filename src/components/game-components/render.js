import React from 'react'
import { logBoard, themes } from "../config"
import { usePageContext } from "../page-wrapper/PageWrapper"
import Piece from "./Piece"
import anime from "animejs/lib/anime.es.js"
import Vector from './Vector'
import ChessBlock from './ChessBlock'
import { produce } from 'immer'

const default_springAnime = {
    direction: "normal",
    easing: 'spring(1, 80, 10, 0)',
    duration: 200,
}

/**
 * @param {Piece} selectedPieceId 
 * @param {Vector} currPos 
 * @param {Vector} nextPos 
 * @param {ChessBlock[][]} chessboard 
 */
export const moveBlock = (selectedId, currPos, nextPos, chessboard) => {
    anime({
        ...default_springAnime,
        targets: `#${selectedId}`,
        top: nextPos.convertToPercentPosition(chessboard).top,
        left: nextPos.convertToPercentPosition(chessboard).left,
    })
}

/**
 * @param {string} selectedId 
 * @param {string} currColor 
 * @param {string} nextColor 
 */
export const changeBgColor = (selectedId, currColor, nextColor) => {
    anime({
        ...default_springAnime,
        targets: `#${selectedId}`,
        backgroundColor: nextColor,
    })
}

/**
 * @param {Vector} pos 
 * @param {ChessBlock[][]} chessboard 
 */
export const renderPieceAt = (pos, chessboard) => {
    const [pageInfo, setPageState] = usePageContext()
    const { selected, currentTheme } = pageInfo

    const piece = new Piece(themes[currentTheme]["piece-color"], pos)

    React.useEffect(() => {
        const nextState = produce(pageInfo, draftState => {
            draftState.playground.chessboard[pos.x][pos.y] = piece
        })
        setPageState(nextState)
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
                    changeBgColor(piece.id, piece.color, themes[currentTheme]["piece-color-highlight"])
                    const nextState = produce(pageInfo, draftState => {
                        draftState.selected = chessboard[piece.currentPos.x][piece.currentPos.y]
                    })
                    setPageState(nextState)
                    return
                }

                changeBgColor(piece.id, themes[currentTheme]["piece-color-highlight"], piece.color)
                const nextState = produce(pageInfo, draftState => {
                    draftState.selected = null
                })
                setPageState(nextState)
            }}
        />
    )
}

/**
 * @param {ChessBlock[][]} chessboard 
 * @returns 
 */
export const renderChessboard = (chessboard) => {
    const [pageInfo, setPageState] = usePageContext()
    const { selected, currentTheme } = pageInfo

    // const initChess = () => {
    //     for (let i = 0; i < chessboard.length; ++i) {
    //         for (let j = 0; j < chessboard[i].length; ++j) {

    //         }
    //     }
    // }

    // React.useEffect(() => {
    //     const nextState = produce(pageInfo, draftState => {
    //         draftState.playground.chessboard = _cloneChessBoard
    //     })
    //     setPageState(nextState)
    // }, [])


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
                        moveBlock(selected.id, selected.currentPos, pos, chessboard)
                        changeBgColor(selected.id, selected.color, selected.color)

                        const nextState = produce(pageInfo, draftState => {
                            draftState.selected = null
                        })
                        setPageState(nextState)
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