import React from 'react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import PageWrapper from './page-wrapper'
import Home from './home-page/Home'
import Playground from './playground-page'
import NoMatch from './page-404'

export const initState = {
    playground: {
        chessboard: new Array(4).fill(0).map(() => new Array(4).fill(0)),
    },
    currentTheme: 0,
    selected: null,
}

const App = () => {
    return (
        <PageWrapper value={{ ...initState }}>
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