import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layout/Layout'

const Home = () => {
    return (
        <Layout>
            <h3 className=''>
                <Link to="/maze">Maze Solver Game</Link>
            </h3>
        </Layout>
    )
}

export default Home