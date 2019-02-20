import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logout from '../actions/logout'
import newGame from '../actions/new_game'
import Canvas from '../containers/Canvas'
import { Redirect } from 'react-router-dom'
import Card from '../components/Card'

class Homepage extends Component{

    constructor(props){
        super(props)
        this.state = {
            redirectToGame: false,
            selectedGameId: null
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.pageStatus.loading && !this.props.pageStatus.loading){
            if(this.state.selectedGameId){
                this.setState({
                    redirectToGame: true
                })
            }else{
                this.setState({
                    redirectToGame: true,
                    selectedGameId: this.props.games[this.props.games.length - 1].id
                })
            }
            
        }
    }

    newSinglescreenGame = () => {
        this.props.newGame("single_screen")
    }

    newRemoteGame = () => {

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
        this.setState({
            selectedGameId: id,
            redirectToGame: true
        })
    }

    renderGames = ({active = true} = {}) => {
        if((this.props.activeGameCount <= 0 && active) || (this.props.gamesWon <= 0 && !active)){
            return active ? "You don't have any active games!" : "You don't have any completed games!"
        }else{
            
            return this.props.games
            .filter(game => game.active === active)
            .map(gameData => (
                <Card 
                    key={gameData.id} 
                    id={gameData.id}
                    title={active? `Ongoing ${gameData.type} vs ${gameData.opponent.username}` : "Completed game "}
                    details={this.constructGameDetails(gameData)}
                    footerDetails={this.constructTurn(gameData)}
                    onClick={active ? this.continueGame : () => null}
                />
            ))
        }
    }

    renderPageLoader = () => {
        if(this.props.pageStatus.loading){
            return(
                <div className="PageLoader"></div>
            )
        }
    }
  

    render(){
        return this.state.redirectToGame ? 
        (<Redirect to={`/games/tank_games/${this.state.selectedGameId}`} />)
        :
        (
            <React.Fragment>
                <div class="nav-container">
                    <button className="btn btn-small btn-danger" onClick={this.props.logout}>Logout</button>
                </div>
                <div class="Homepage">
                    {this.renderPageLoader()}
                    <h1 className={"HomepageHeader"}>Welcome, {this.props.username}</h1>
                    <div className="GameButtonContainer">
                        <button className="btn btn-default game-btn" onClick={this.newSinglescreenGame}>New Single Screen Game</button>
                        <button className="btn btn-default game-btn" onClick={this.newRemoteGame}>New Remote Game</button>
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
            </React.Fragment>
            
            
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    newGame: (gameType) => dispatch(newGame(gameType))
})

const mapStateToProps = ({ user, games, pageStatus }) => ({
    username: user.username,
    id: user.id,
    activeGameCount: user.activeGames,
    gamesWon: user.gamesWon,
    games,
    pageStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)

