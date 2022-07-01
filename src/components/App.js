import React from 'react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import PageWrapper from './page-wrapper'
import Home from './home-page/Home'
import Maze from './maze-page'
import NoMatch from './page-404'
import { maze_generatePiecesFrom } from './maze-page/utility'

export const STATE_CONFIG = "config"
export const KEY_SELECTED = "selected"
export const KEY_PIECES_BOARD = "piecesBoard"
export const STATE_MAZE_SOLVER = "mazeSolver"
export const KEY_CURRENT_THEME = "currentTheme"
export const KEY_CURRENT_LEVEL = "currentLevel"
export const KEY_BOARD_SIZE_X = "boardSizeX"
export const KEY_BOARD_SIZE_Y = "boardSizeY"

export const initAppState = {
    [STATE_MAZE_SOLVER]: {
        [KEY_BOARD_SIZE_X]: 3,
        [KEY_BOARD_SIZE_Y]: 3,
        [KEY_CURRENT_LEVEL]: 0,
        [KEY_PIECES_BOARD]: null,
        [KEY_SELECTED]: null,
    },
    [STATE_CONFIG]: {
        [KEY_CURRENT_THEME]: 0,
    }
}

const App = () => {
    let doesNeedPrintAppLog = process.env.NODE_ENV === "development" ? true : false

    const currentTheme = initAppState[STATE_CONFIG][KEY_CURRENT_THEME]
    const boardSizeX = initAppState[STATE_MAZE_SOLVER][KEY_BOARD_SIZE_X]
    const boardSizeY = initAppState[STATE_MAZE_SOLVER][KEY_BOARD_SIZE_Y]

    initAppState[STATE_MAZE_SOLVER][KEY_PIECES_BOARD] = maze_generatePiecesFrom(boardSizeX, boardSizeY, currentTheme)

    return (
        <PageWrapper value={{ ...initAppState }} _printLog={doesNeedPrintAppLog}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/maze" element={<Maze />} />
                    <Route path="/*" element={<NoMatch />} />
                </Routes>
            </Router>
        </PageWrapper>
    )
}

export default App