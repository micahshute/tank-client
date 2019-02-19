import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logout from '../actions/logout'
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
        if(this.props.activeGameCount <= 0){
            return active ? "You don't have any active games!" : "YOu don't have any completed games!"
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

    render(){
        console.log(this.props.games)
        return this.state.redirectToGame ? 
        (<Redirect to={`/games/tank_games/${this.state.selectedGameId}`} />)
        :
        (
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

const mapStateToProps = ({ user, games }) => ({
    username: user.username,
    id: user.id,
    activeGameCount: user.activeGames,
    games
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)

