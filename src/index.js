import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import 'bootstrap/dist/css/bootstrap.min.css'

const render = (Component) => ReactDOM.render(<Component />, document.getElementById("root"))
render(App)