import React, { Component} from 'react'
import Login from '../components/AuthForm'
import { Link } from 'react-router-dom'

class LoginContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: '',
            requestingLogin: false,
            invalidEntries: true
        }
    }

    handleLogin = (e) => {
        e.preventDefault()
        if(this.state.invalidEntries) return
        this.setState({
            requestingLogin: true
        })
        //perform request
        //if incorrect, clear state
        //if correct, redirect to 'home'
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, this.validateEntries)
    }


    validateEntries = () =>{
        if(this.state.username != "" && this.state.password != ""){
            this.setState({
                invalidEntries: false
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                <div class="nav-container">
                    <Link to="/" className="btn btn-sm btn-default">Back</Link>
                    <Link to="/signup" className="btn btn-sm btn-default">Signup</Link>
                </div>
                <div className="LoginContainer">
                    <h1 className="Login-header">Login to Tank Wars</h1>
                    <div className="form-container">
                        <Login 
                            username={this.state.username}
                            password={this.state.password}
                            handleSubmit={this.handleLogin}
                            handleChange={this.handleChange}
                            errors={this.state.errors}
                            loading={this.state.requestingLogin}
                            invalidEntries={this.state.invalidEntries}
                        />

                    </div>
                </div>
            </React.Fragment>
                
        )
    }
}

export default LoginContainer