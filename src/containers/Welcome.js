import React, { Component } from 'react'
import logo from "../assets/tank.png"
import { Link } from 'react-router-dom'

class Welcome extends Component{

    constructor(props){
        super(props)

    }

    render(){

        return (
            <div>
                <h1 className="Welcome-header">Welcome to Tank Wars!</h1>
                <img src={logo} alt="logo" className="App-logo" />
                <div className="flexbox">
                    <Link to={`/signup`} className="btn btn-default padded margin-md">Sign Up</Link>
                    <Link to={`/login`} className="btn btn-default padded margin-md">Log In</Link>
                </div>
            </div>
        )
    }
}

export default Welcome