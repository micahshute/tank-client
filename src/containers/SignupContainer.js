import React, { Component} from 'react'
import Signup from '../components/AuthForm'
import { Link } from 'react-router-dom'

class SignupContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: '',
            requestingLogin: false,
            invalidEntries: true,
            usernameTaken: true
        }
    }

    handleLogin = (e) => {
        e.preventDefault()
        if(this.state.invalidEntries) return
        this.setState({
            requestingLogin: true
        })
        //perform request for signup
        //if incorrect, clear state
        //if correct, redirect to 'home'
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, this.validateEntries)
    }

    
    verifyUsername = async () => {
        //check to see if username is taken
        //if not taken, setState
    }


    validateEntries = () =>{
        if(this.state.username != "" && this.state.password != "" && !this.state.usernameTaken){
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
                    <Link to="/login" className="btn btn-sm btn-default">Login</Link>
                </div>
                <div className="LoginContainer">
            
                    <h1 className="Login-header">Sign Up for Tank Wars</h1>
                    <div className="form-container">
                        <Signup 
                            username={this.state.username}
                            password={this.state.password}
                            handleSubmit={this.handleLogin}
                            handleChange={this.handleChange}
                            errors={this.state.errors}
                            loading={this.state.requestingLogin}
                            submitText={"Signup"}
                            invalidEntries={this.state.invalidEntries}
                            verifyUsername={this.verifyUsername}
                        />
                    </div>
                
                </div>
            </React.Fragment>
            
        )
    }
}

export default SignupContainer