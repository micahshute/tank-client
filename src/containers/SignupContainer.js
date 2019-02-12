import React, { Component} from 'react'
import Signup from '../components/AuthForm'
import { 
    Link,
    Redirect 
} from 'react-router-dom'
import apiManager from '../http_requests/api_manager'
import { connect } from 'react-redux'
import { GET_TOKEN } from '../types'

class SignupContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: '',
            requestingLogin: false,
            invalidEntries: true,
            usernameTaken: false,
            redirectToHomepage: false
        }
    }

    handleSignup = async (e) => {
        e.preventDefault()
        if(this.state.invalidEntries) return
        this.setState({
            requestingLogin: true
        })
        const { csrfToken } = await apiManager.csrfToken()
        const {username, password} = this.state
        const data = await apiManager.signup(username, password, csrfToken)
        if(data.signup === "success"){
            this.updateSuccessfulLoginState()
        }else{
            if(data.errors === "Invalid authenticity token"){
                const { csrfToken } = await apiManager.csrfToken()
                this.props.setToken(csrfToken)
                const reattemptedData = await apiManager.signup(username, password, this.props.token )
                if(reattemptedData.signup === "success"){
                    this.updateSuccessfulLoginState()
                }else{
                    this.updateFailedLoginState(reattemptedData)
                }
            }else{
                this.updateFailedLoginState(data)
            }
        }
    }

    
    updateFailedLoginState = (data) => {
        this.setState({
            password: '',
            requestingLogin: false,
            errors: data.errors
        }, this.validateEntries)
    }

    updateSuccessfulLoginState = () => {
        this.setState({
            redirectToHomepage: true
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, this.validateEntries)
    }

    
    verifyUsername = async () => {
        const data = await apiManager.isValidUsername(this.state.username)
        if(data.taken != this.state.usernameTaken){
            this.setState({
                usernameTaken: data.taken
            }, this.validateEntries)

        }      
    }


    validateEntries = () =>{
        if(this.state.username != "" && this.state.password != "" && !this.state.usernameTaken){
            this.setState({
                invalidEntries: false
            })
        }
    }


    render(){

        if(this.state.redirectToHomepage){
            return <Redirect to="/home" />
        }

        return(
            <React.Fragment>
                <div className="nav-container">
                    <Link to="/" className="btn btn-sm btn-default">Back</Link>
                    <Link to="/login" className="btn btn-sm btn-default">Login</Link>
                </div>
                <div className="LoginContainer">
            
                    <h1 className="Login-header">Sign Up for Tank Wars</h1>
                    <div className="form-container">
                        <Signup 
                            username={this.state.username}
                            password={this.state.password}
                            handleSubmit={this.handleSignup}
                            handleChange={this.handleChange}
                            errors={this.state.errors}
                            loading={this.state.requestingLogin}
                            submitText={"Signup"}
                            invalidEntries={this.state.invalidEntries}
                            verifyUsername={this.verifyUsername}
                            usernameTaken={this.state.usernameTaken}
                        />
                    </div>
                
                </div>
            </React.Fragment>
            
        )
    }
}

const mapStateToProps = ({ token }) => ({
    token
})

const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(dispatch => dispatch({type: GET_TOKEN, payload: token}))
})


export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)