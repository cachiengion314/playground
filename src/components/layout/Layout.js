import './layout.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Container, Divider, Icon } from 'semantic-ui-react'

const Layout = ({ children }) => {

    return (
        <Container>
            <Link to="/">
                <Header as="h1" className={"h1"}>
                    Playground with algorithms
                </Header>
            </Link>

            {children}


            <div className={"footer"}>
                <Divider />
                <p className={"pullRight"}>
                    Made with <Icon name="heart" color="red" /> by cachiengion314
                </p>
            </div>
        </Container>
    )
}

export default Layout