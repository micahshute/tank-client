import React, { Component } from 'react'
import authenticateUser from '../actions/authenticate_user'
import getToken from '../actions/get_token'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import apiManager from '../http_requests/api_manager';

class PrivatePage extends Component{

    constructor(props){
        super(props)
        this.state = {
            requestSent: false
        }
    }

    componentDidMount(){
        this.props.authenticate()
        this.setState({
            requestSent: true
        })
    }

    renderPage = () => {

        if(this.props.user.authenticated && !!this.props.user.username){
            console.log(`Authenticated!:  ${apiManager.authenticity_token}`)
            return this.props.children
        }else if(this.props.user.loading || !this.state.requestSent){
            console.log("LOADING")
            return <div className="loader"></div>
        }else if(!this.props.user.loading && !this.props.user.authenticated){
            console.log("NOT AUTHENTICATED")
            return <Redirect to='/login' />
        }
        
    }

    render(){
        return(
            <div className="App">
                <header className="App-header">
                {this.renderPage()}
                </header>
            </div>
        )
        
        
    }
}


const mapStateToProps = ({ user }) => ({
    user
})

const mapDispatchToProps = dispatch => ({
    authenticate: () => dispatch(authenticateUser()),
    getToekn: () => dispatch(getToken())
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePage)

