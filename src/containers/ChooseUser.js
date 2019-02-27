import React, { Component } from 'react'
import { SelectableUser } from '../components/SelectableUser'
import apiManager from '../http_requests/api_manager'
import { Redirect } from 'react-router-dom'
import newGame from '../actions/new_game'
import { connect } from 'react-redux'

class ChooseUser extends Component{

    constructor(props){
        super(props)

        this.state = {
            users: [],
            redirectToHome: false
        }
    }

    containerStyle = {
        width: '75%',
        display: "flex",
        justifyContent: 'space-between',
        flexWrap: "wrap"
    }

    async componentDidMount(){
        const usersList = await apiManager.users()
        const usernames = usersList.users.map(u => u.username)
        this.setState({ users: usernames })
    }

    renderPageLoader = () => {
        if(this.props.pageStatus.loading){
            return(
                <div className="PageLoader"></div>
            )
        }
    }


    componentDidUpdate(prevProps){
        if(prevProps.games.length < this.props.games.length){
            this.setState({
                redirectToHome: true
            })
        }
    }


    handleSelection = username => {
        this.props.newGame('remote', username)
    }

    render(){
        if(this.state.redirectToHome){
            return <Redirect to="/home" />
        }
        return(
            <div style={this.containerStyle}>
                { this.renderPageLoader() }
                { this.state.users.filter(u => u !== this.props.user.username).map(u => <SelectableUser  username={u} onSelect={(username) => this.handleSelection(username)} />) }
            </div>
           
        )
       
    }


}

const mapStateToProps = ({ user, pageStatus, games }) => ({
    user,
    pageStatus,
    games
})

const mapDispatchToProps = dispatch => ({
    newGame: (gameType, username) => dispatch(newGame(gameType, username))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseUser)