import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logout from '../actions/logout'
import Canvas from '../containers/Canvas'
import apiManager from '../http_requests/api_manager'
import Card from '../components/Card'

class Homepage extends Component{

    constructor(props){
        super(props)
        this.state = {
            activeGames: [],
            completedGames: []
        }
    
    }

    componentDidMount(){
        apiManager.fetchMyGames().then(data => {
            this.setState({
                activeGames: data.games.filter(game => !game.winner),
                completedGames: data.games.filter(game => !!game.winner )
            })
        })
    }

    constructGameDetails = (data) => {
        if(data.singleScreen){
            return {
                Type: "Single Screen Game",
                "Blue's health": data.healthPlayerOne,
                "Red's health": data.healthPlayerTwo
            }
        }else{
            const yourHealthIndex = data.healths.findIndex(h => h.username === this.props.username )
            const yourHealth = data.healths[yourHealthIndex].value
            const opponentHealth = data.healths[(yourHealthIndex + 1) % 2].value

            return {
                Type: "Remote Game",
                Opponent: data.opponent.username,
                "Your Health": yourHealth,
                "Opponent's Health": opponentHealth

            }
        }
    }

    constructTurn = (data) => {
        if( data.active ){
            if(data.singleScreen){
                return  `It is ${(data.numberOfTurns % 2 == 0 ? "Blue" : "Red")}'s turn`
            }else{
                return `It is ${data.turn.username}'s turn`
            }
        }else{
            if(data.singleScreen){
                return "Game is over!"
            }else{
                return `${data.winner.username} won!`
            }
        }
       
    }

    continueGame = (id) => {
        console.log(`Continue game ${id}`)
    }

    renderGames = ({active = true} = {}) => {
        if(this.props.activeGameCount <= 0){
            return active ? "You don't have any active games!" : "YOu don't have any completed games!"
        }else{
            const data = active ? this.state.activeGames : this.state.completedGames
            return data.map(gameData => (
                <Card 
                    key={gameData.id} 
                    id={gameData.id}
                    title={`Ongoing ${gameData.type} vs ${gameData.opponent.username}`}
                    details={this.constructGameDetails(gameData)}
                    footerDetails={this.constructTurn(gameData)}
                    onClick={this.continueGame}
                />
            ))
        }
    }

    render(){
        return (
            <div class="Homepage">
                <h1 className={"HomepageHeader"}>Welcome, {this.props.username}</h1>
                <div className="GameButtonContainer">
                    <button className="btn btn-default game-btn">New Single Screen Game</button>
                    <button className="btn btn-default game-btn">New Remote Game</button>
                </div>  
                <div class="GameColumns">
                    <div class="GameColumn">
                        <h3 className="HomepageHeader" >Current Games:</h3>
                        {this.renderGames()}
                    </div>
                    <div class="GameColumn">
                    <h3 className="HomepageHeader" >Completed Games:</h3>
                        {this.renderGames({active: false})}
                    </div>
                </div>
                
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

const mapStateToProps = ({ user }) => ({
    username: user.username,
    id: user.id,
    activeGameCount: user.activeGames
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)


{/* <div class="nav-container">
<Link to="/" className="btn btn-sm btn-default" onClick={this.props.logout}>Logout</Link>
</div> */}