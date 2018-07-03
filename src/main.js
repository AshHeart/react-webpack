import React from "react"
import ReactDOM from "react-dom"

import './sass/main.scss'

class Layout extends React.Component
{
    render() {
        return (
            <div>
                <h1>It works Finally!!</h1>
                <p>So, this is react eh?</p>
            </div>
        )
    }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout/>, app)