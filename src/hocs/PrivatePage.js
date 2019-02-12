import React, { Component } from 'react'
import authenticateUser from '../actions/authenticate_user'
import getToken from '../actions/get_token'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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

        if(this.props.user.authenticated){
            return this.props.children
        }else if(this.props.user.loading || !this.state.requestSent){
            return <div className="loader"></div>
        }else if(!this.props.user.loading && !this.props.user.authenticated){
            return <Redirect to='/login' />
        }
        
    }

    render(){
        return(
            <React.Fragment>
                {this.renderPage()}
            </React.Fragment>
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

