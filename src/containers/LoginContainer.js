import React, { Component} from 'react'
import Login from '../components/AuthForm'
import { 
    Link,
    Redirect 
} from 'react-router-dom'
import apiManager from '../http_requests/api_manager';
import { connect } from 'react-redux'
import FlashMessage from '../components/FlashMessage'
import { GET_TOKEN } from '../types'

class LoginContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: '',
            requestingLogin: false,
            invalidEntries: true,
            redirectToHomepage: false
        }
    }

    handleLogin = async (e) => {
        e.preventDefault()
        if(this.state.invalidEntries) return
        this.setState({
            requestingLogin: true
        })
        const { username, password } = this.state
        const data = await apiManager.login(username, password, this.props.token )
        if(data.login === "success"){
            this.updateSuccessfulLoginState()
        }else{
            if(data.errors === "Invalid authenticity token"){
                const { csrfToken } = await apiManager.csrfToken()
                console.log(csrfToken)
                this.props.setToken(csrfToken)
                const reattemptedData = await apiManager.login(username, password, this.props.token )
                if(reattemptedData.login === "success"){
                    this.updateSuccessfulLoginState()
                }else{
                    this.updateFailedLoginState(reattemptedData)
                }
            }else{
                this.updateFailedLoginState(data)
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, this.validateEntries)
    }

    updateFailedLoginState = (data) => {
        this.setState({
            username: '',
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


    validateEntries = () =>{
        if(this.state.username != "" && this.state.password != ""){
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
                <div class="nav-container">
                    <Link to="/" className="btn btn-sm btn-default">Back</Link>
                    <Link to="/signup" className="btn btn-sm btn-default">Signup</Link>
                </div>
                <FlashMessage msg={this.props.user.errors} type="danger" />
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

const mapStateToProps = ({token, user}) => ({
    token,
    user
})

const mapDispatchToProps = dispatch => ({
    setToken: (csrfToken) => dispatch(dispatch => dispatch({type: GET_TOKEN, payload: { csrfToken }}))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)