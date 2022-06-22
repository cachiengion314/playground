import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layout/Layout'

const Home = () => {
    return (
        <Layout>
            <p className=''>
                <Link to="/playground">Navigate to playground Page</Link>
            </p>
        </Layout>
    )
}

export default Home