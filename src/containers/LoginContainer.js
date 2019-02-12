import React, { Component} from 'react'
import Login from '../components/AuthForm'
import { 
    Link,
    Redirect 
} from 'react-router-dom'
import ApiManager from '../http_requests/api_manager';
import { connect } from 'react-redux'

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
        this.apiManager = new ApiManager()
    }

    handleLogin = async (e) => {
        e.preventDefault()
        if(this.state.invalidEntries) return
        this.setState({
            requestingLogin: true
        })
        const { username, password } = this.state
        const data = await this.apiManager.login(username, password, this.props.token )
        if(data.login === "success"){
            this.setState({
                redirectToHomepage: true
            })
        }else{
            this.setState({
                username: '',
                password: '',
                requestingLogin: false,
                errors: data.error
            }, this.validateEntries)
        }
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

        if(this.state.redirectToHomepage){
            return <Redirect to="/home" />
        }

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

const mapStateToProps = ({token}) => ({
    token
})

export default connect(mapStateToProps)(LoginContainer)