import './playground.css'
import React from 'react'
import Layout from '../layout'
import { Button, Header } from 'semantic-ui-react'
import Vector from '../game-components/Vector'
import { usePageContext } from '../page-wrapper/PageWrapper'
import { renderChessboard, renderPieceAt } from '../game-components/render'
import produce from 'immer'

const Playground = () => {
    const [playing, setPlaying] = React.useState(false)
    const animation = React.useRef(null)
    const [pageInfo] = usePageContext()
    const { playground } = pageInfo
    const { chessboard } = playground

    const handlePlay = () => {
        console.log("Play!!!")
    }

    const const_x = chessboard.length
    const const_y = chessboard[0].length
    const x_y = const_x / const_y

    return (
        <Layout>
            <Header as="h2">Playground</Header>

            <div className={"play-content"}>
                <div
                    className={"chess-board"}
                    style={{
                        width: `${75 * x_y}vmin`,
                        height: `${75 * 1 / x_y}vmin`,
                    }}
                >
                    {renderChessboard(produce(chessboard, (d) => d))}
                    {renderPieceAt(new Vector(1, 3), produce(chessboard, (d) => d))}
                </div>

                <Button
                    onClick={handlePlay}
                    color={"green"}
                    className="mt-3 border"
                >
                    {playing ? "Pause" : "Play"}
                </Button>
            </div>
        </Layout>
    )
}

export default Playground