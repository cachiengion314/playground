import './playground.css'
import React from 'react'
import Layout from '../layout'
import { Header } from 'semantic-ui-react'
import { usePageContext } from '../page-wrapper/PageWrapper'
import { Chessboard } from '../game-components/Chessboard'
import { Pieces } from '../game-components/Pieces'
import { KEY_BOARD_SIZE_X, KEY_BOARD_SIZE_Y, KEY_CURRENT_LEVEL, STATE_MAZE_SOLVER } from '../App'
import { Obstacles } from '../game-components/Obstacles'
import { Destinations } from '../game-components/Destinations'

const Maze = () => {
    const [app] = usePageContext()
    const {
        [KEY_BOARD_SIZE_X]: boardSizeX,
        [KEY_BOARD_SIZE_Y]: boardSizeY,
        [KEY_CURRENT_LEVEL]: currLevel,
    } = app[STATE_MAZE_SOLVER]

    const ratio = boardSizeX / boardSizeY

    return (
        <Layout>
            <Header as="h2">Maze Solver - level:<span>&nbsp;</span>{currLevel + 1}</Header>
            <h4 className='mb-4'>board size x: {boardSizeX}<span>&nbsp;</span> y: {boardSizeY} </h4>

            <div className={"play-content"}>
                <div
                    className={"chess-board"}
                    style={{
                        width: `${75 * ratio}vmin`,
                        height: `${75 * 1}vmin`,
                    }}
                >
                    <Chessboard stateName={STATE_MAZE_SOLVER} />
                    <Obstacles stateName={STATE_MAZE_SOLVER} />
                    <Pieces stateName={STATE_MAZE_SOLVER} />
                    <Destinations stateName={STATE_MAZE_SOLVER} />
                </div>
            </div>
        </Layout>
    )
}

export default Maze