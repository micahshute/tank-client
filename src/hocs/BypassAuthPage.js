import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class BypassAuthPage extends Component{

    renderPage = () => {

        if(this.props.user.authenticated){
            return <Redirect to="/home" />
        }else{
            return this.props.children
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

export default connect(mapStateToProps)(BypassAuthPage)

