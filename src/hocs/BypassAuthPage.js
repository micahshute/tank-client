import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class BypassAuthPage extends Component{

    renderPage = () => {

        if(this.props.user.authenticated){
            return <Redirect to="/" />
        }else{
            return this.props.children
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

export default connect(mapStateToProps)(BypassAuthPage)

