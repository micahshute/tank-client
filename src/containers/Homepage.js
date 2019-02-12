import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logout from '../actions/logout'
import Canvas from '../containers/Canvas'

class Homepage extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return (
            <div>

                <Canvas />
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Homepage)


{/* <div class="nav-container">
<Link to="/" className="btn btn-sm btn-default" onClick={this.props.logout}>Logout</Link>
</div> */}