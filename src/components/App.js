import React from 'react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import PageWrapper from './page-wrapper'
import Home from './home-page/Home'
import Playground from './playground-page'
import NoMatch from './page-404'

export const STATE_CONFIG = "config"
export const KEY_SELECTED = "selected"
export const KEY_CHESSBOARD = "chessboard"
export const STATE_PLAYGROUND = "playground"
export const KEY_CURRENT_THEME = "currentTheme"

export const initAppState = {
    [STATE_PLAYGROUND]: {
        [KEY_CHESSBOARD]: new Array(8).fill(0)
            .map(() => new Array(8).fill(0)),
        [KEY_SELECTED]: null
    },
    [STATE_CONFIG]: {
        [KEY_CURRENT_THEME]: 0,
    }
}

const App = () => {
    return (
        <PageWrapper value={{ ...initAppState }} _needLog={false}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/playground" element={<Playground />} />
                    <Route path="/*" element={<NoMatch />} />
                </Routes>
            </Router>
        </PageWrapper>
    )
}

export default App