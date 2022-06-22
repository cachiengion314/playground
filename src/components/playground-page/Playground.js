import './playground.css'
import React from 'react'
import Layout from '../layout'
import { Button, Header } from 'semantic-ui-react'
import Vector from '../game-components/Vector'
import { usePageContext } from '../page-wrapper/PageWrapper'
import { renderChessboard, renderPieceAt } from '../game-components/render'

const Playground = () => {
    const [playing, setPlaying] = React.useState(false)
    const animation = React.useRef(null)
    const [pageInfo] = usePageContext()
    const { playGround } = pageInfo
    const { chessboard } = playGround

    const handlePlay = () => {
        console.log("Play!!!")
    }

    return (
        <Layout>
            <Header as="h2">Playground</Header>

            <div className={"play-content"}>
                <div className={"chess-board"}>
                    {renderChessboard(chessboard)}
                    {renderPieceAt(new Vector(1, 3), chessboard)}
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