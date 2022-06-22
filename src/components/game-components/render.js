import React from 'react'
import { logBoard, themes } from "../config"
import { usePageContext } from "../page-wrapper/PageWrapper"
import Piece from "./Piece"
import anime from "animejs/lib/anime.es.js"
import Vector from './Vector'
import ChessBlock from './ChessBlock'

/**
 * @param {Vector} pos 
 * @param {ChessBlock[][]} chessboard 
 */
export const renderPieceAt = (pos, chessboard) => {
    const [pageInfo] = usePageContext()
    const { currentTheme } = pageInfo

    const movePiece = (selectedPieceId, currPos, nextPos) => {

        anime({
            targets: `#${selectedPieceId}`,
            top: nextPos.convertToPercentPosition().top,
            left: nextPos.convertToPercentPosition().left,
            direction: "normal",
            easing: 'spring(1, 80, 10, 0)',
            duration: 200,
        })
    }

    const piece = new Piece(themes[currentTheme]["attack-block"], pos)
    chessboard[pos.x][pos.y] = piece
    logBoard(chessboard)

    return (
        <div
            id={`${piece.id}`} key={`${piece.id}`}
            style={{
                top: pos.convertToPercentPosition().top,
                left: pos.convertToPercentPosition().left,
                backgroundColor: "green",
            }}
            className="chess-piece"
            onClick={() => {
                movePiece(piece.id, pos, new Vector(7, 7))
            }}
        />
    )
}

/**
 * @param {ChessBlock[][]} chessboard 
 * @returns 
 */
export const renderChessboard = (chessboard) => {
    const [pageInfo] = usePageContext()
    const { currentTheme } = pageInfo

    return chessboard.map((arr, x) => {
        return arr.map((elt, y) => {
            const pos = new Vector(x, y)
            const block = new ChessBlock(pos)
            chessboard[x][y] = block

            let defaultColor = ""
            if (pos.isXYUniform()) {
                defaultColor = themes[currentTheme]["dark-block"]
            } else {
                defaultColor = themes[currentTheme]["light-block"]
            }

            return (
                <div
                    id={block.id} key={block.id}
                    style={{
                        top: pos.convertToPercentPosition().top,
                        left: pos.convertToPercentPosition().left,
                        backgroundColor: defaultColor,
                    }}
                    className={`chess-block`}
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