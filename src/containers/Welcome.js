import React, { Component } from 'react'
import logo from "../assets/tank.png"
class Welcome extends Component{

    constructor(props){
        super(props)

    }

    render(){

        return (
            <div>
                <h1 className="Welcome-header">Welcome to Tank Wars!</h1>
                <img src={logo} alt="logo" className="App-logo" />
                <div>
                    <button className="btn btn-default padded margin-md">Sign Up</button>
                    <button className="btn btn-default padded margin-md">Log In</button>
                </div>
            </div>
        )
    }
}

export default Welcome