import React, { Component } from 'react'
import Canvas from './Canvas'
import Sky from '../components/Sky'
import Ground from '../components/Ground'
import Tank from '../components/Tank'
import Bullet from '../components/Bullet'
import ScoreBoard from '../components/ScoreBoard'
import { 
    canvasMousePosition,
    calculateAngle
} from '../utils/formulas'
import {
    tankWidth,
    tankHeight
} from '../utils/constants'
import EarthPhysicsMachine from '../utils/earth_physics_machine';
import Hill from '../components/Hill'
import Health from '../components/Health'
import Explosion from '../components/Expolosion'
import { connect } from 'react-redux'
import endTurn from '../actions/end_game_turn'
import registerHit from '../actions/register_tank_hit'
import { Redirect } from 'react-router-dom'
import apiManager from '../http_requests/api_manager';
import { objEq } from '../utils/helpers';
import manualGameUpdate from '../actions/manual_game_update'

class TankGame extends Component{

    constructor(props){
        super(props)

        let canShootInit
        if(this.props.game.singleScreen){
            canShootInit = true
        }else{
            canShootInit = this.props.game.turn.username === this.props.user.username
        }

        this.state = {
            bullets: [],
            score: 0,
            tanks: [
                {
                    position: {
                        x: 700,
                        y: 0
                    },
                    angle: -45,
                    color: 'blue',
                    user: 0
                },
                {
                    position: {
                        x: -700,
                        y: 0
                    },
                    angle: 45,
                    color: 'red',
                    user: 1
                }
            ],
            activeExplosion: undefined,
            turns: 0,
            activeBullet: undefined,
            canShoot: canShootInit,
            gameOverMessage: "",
            redirectToHome: false
        }
        this.canvasMousePosition = 0
        this.setAngle = this.setAngle.bind(this)
        this.updateBullets = this.updateBullets.bind(this)
    }

    componentDidMount(){
        console.log("AUTHENTICITY TOKEN: ")
        console.log(apiManager.authenticity_token)
        this.interval = setInterval(() => {
            this.setAngle()
            this.updateBullets()
            this.checkTurnEnd()
        }, 10)

        if(!this.props.game.singleScreen){
           this.updateGameInterval = setInterval(() => {
               apiManager.fetchMyGame(this.props.game.id)
               .then(data => {
                //    console.log(data)
                //    console.log(this.props.game)
                //    console.log(objEq(data, this.props.game))
                //    console.log('-------------------------------')
                   if(!objEq(data, this.props.game)){
                       this.props.updateGame(data)
                       this.checkWin()
                   }
               })
           }, 5000)
        }

        window.onresize = () => {
            const cnv = document.getElementById('canvas');
            if(!cnv) return
            cnv.style.width = `${window.innerWidth}px`;
            cnv.style.height = `${window.innerHeight}px`;
          };

        window.onresize();
        this.checkWin()
    }

    componentWillUnmount(){
        if(!this.props.game.singleScreen){
            clearInterval(this.updateGameInterval)
        }
        clearInterval(this.interval)
    }

    componentDidUpdate(prevProps){
        if(!this.props.game.singleScreen){
            if((this.props.game.turn.username === this.props.user.username) && (prevProps.game.turn.username !== prevProps.user.username)){
                this.setState({
                    canShoot: true
                })
            }
        }
    }


    checkTurnEnd = () => {
        if(this.state.activeBullet === undefined) return 
        const activeBullet = this.state.bullets[this.state.activeBullet]
        if(activeBullet.velocity.x === 0 && activeBullet.velocity.y === 0){
            this.updateTurn()
        }
    }

    updateTurn = () => {
        this.props.endTurn(this.props.id)
        this.setState({
            canShoot: this.checkTurn(),
            activeBullet: undefined
        })
    }

    shoot = () => {
        if(!this.state.canShoot) return 
        const angle = this.state.tanks[this.activePlayer()].angle
        const position = this.state.tanks[this.activePlayer()].position
        const newBullet = {
            position: EarthPhysicsMachine.calculateBarrelExitPiont(angle, position),
            velocity: EarthPhysicsMachine.calculateVelocityVector({velocity: 1300, angle})
        }

        this.setState({
            bullets: [...this.state.bullets, newBullet],
            canShoot: false,
            activeBullet: this.state.bullets.length
        })
    }

    updateBullets = () => {
        let bullets = [...this.state.bullets]
        let target = { ...this.state.tanks[this.inactivePlayer()], width: tankWidth, height: tankHeight, type: "tank" }
        bullets = bullets.filter(b => {
            let collision = !EarthPhysicsMachine.testCollision({...b, type: "centered"}, target)
            if(!collision){
                this.collisionOccurred()
            }
            return collision
            
        })
        let updatedBullets = bullets.map(bullet => {
            const { position, velocity } = EarthPhysicsMachine.update2DLocation(bullet)
            return { position, velocity }
        })
        this.setState({
            bullets: updatedBullets
        })
    }

    collisionOccurred = () => {
        const victimIndex = this.inactivePlayer()
        this.props.registerHit(this.inactivePlayerName(), this.props.id)
        this.setState({
            canShoot: this.checkTurn(),
            activeBullet: undefined,
            explosion: {
                position: this.state.tanks[victimIndex].position
            }
        }, this.checkWin)
    }

    checkTurn = () => {
        if(this.props.game.singleScreen){
            return true
        }else{
            return false
        }
    }

    checkWin = () => {
        if(this.props.game.singleScreen){
            if(this.props.game.healthPlayerOne === 0){
                this.setState({
                    canShoot: false,
                    gameOverMessage: `Red Wins!`
                })
            }else if(this.props.game.healthPlayerTwo === 0){
                this.setState({
                    canShoot: false,
                    gameOverMessage: `Blue Wins!`
                })
            }
        }else{
            const { healths } = this.props.game
            if(parseInt(healths[0].value) <= 0){
                this.setState({
                    canShoot: false,
                    gameOverMessage: `${healths[1].username} Wins!`
                })
            }
            if(parseInt(healths[1].value) <= 0){
                this.setState({
                    canShoot: false,
                    gameOverMessage: `${healths[0].username} Wins!`
                })
            }
            // if(this.props.game.winner){
            //     this.setState({
            //         canShoot: false,
            //         gameOverMessage: `${this.props.game.winner.username} Wins!`
            //     })
            // }
        }
        
    }

    inactivePlayerName = () => {
        if(this.props.game.singleScreen){
            return this.inactivePlayer() + 1
        }else{
            return this.activePlayerName() === this.props.user.username ? this.props.game.opponent.username : this.props.user.username
        }
    }

    activePlayerName = () => {
        if(this.props.game.singleScreen){
            return this.activePlayer() + 1
        }else{
            return this.props.game.turn.username
        }
    }

    inactivePlayer = () => {
        return this.activePlayer() == 0 ? 1 : 0
    }

    activePlayer = () => {
        if(this.props.game.singleScreen){
            return this.props.game.numberOfTurns % 2
        }else{
            return this.props.game.turn.player - 1
        }
    }

    setAngle = () => {
        const { x, y } = this.canvasMousePosition
        const activePlayer = this.activePlayer()
        const barrelX = this.state.tanks[activePlayer].position.x
        const barrelY = this.state.tanks[activePlayer].position.y
        const newTanks = [...this.state.tanks]
        newTanks[activePlayer].angle = calculateAngle(barrelX, barrelY, x, y)
        this.setState({
            tanks: newTanks
        })
    }

    renderTanks = () => {
        return this.state.tanks.map((tankData, index) => <Tank key={index} {...tankData} /> )
    }

    renderBullets = () => {
        return this.state.bullets.map((b, i) => <Bullet key={i} position={b.position}/>)
    }

    renderExplosions = () => {
        const { explosion } = this.state
        if(explosion){
            return <Explosion position={explosion.position} completeExplosion={this.explosionCompleted} />
        }else{
            return null
        }
    }

    explosionCompleted = () => {
        this.setState({
            explosion: null
        })
    }

    trackMouse(event){
        this.canvasMousePosition = canvasMousePosition(event)
    }

    playerOneUsername = () => {
        return this.usernameForPlayer(1)
    }

    playerTwoUsername = () => {
        return this.usernameForPlayer(2)
    }

    myPlayerNumber = () => {
        return this.props.game.opponent.player == 1 ? 2 : 1
    }

    usernameForPlayer = (player) => {
        return this.props.game.opponent.player == player ? this.props.game.opponent.username : this.props.user.username
    }

    playerOneHealth = () => {
        return this.healthForPlayer(1)
    }

    playerTwoHealth = () => {
        return this.healthForPlayer(2)
    }   

    healthForPlayer = (player) => {
        if(this.props.game.singleScreen){
            if(player == 1){
                return this.props.game.healthPlayerOne
            }else if(player == 2){
                return this.props.game.healthPlayerTwo
            }else{
                throw new Error("Invalid Player")
            }
        }else{
            const playerOne = this.usernameForPlayer(1)
            const playerTwo = this.usernameForPlayer(2)
            if(player == 1){
                return this.props.game.healths.find(health => health.username === playerOne ).value
            }else if(player == 2){
                return this.props.game.healths.find(health => health.username === playerTwo ).value
            }else{
                throw new Error("Invalid Player")
            }
        }
    }

    leaveGame = (e) => {
        this.setState({
            redirectToHome: true
        })
    }

    render(){

        if(this.state.redirectToHome){
            return <Redirect to="/home" />
        }

        return(
            <Canvas 
                Environment={
                    [
                        <Sky key="Sky" />,
                        <Ground key="Ground" />,
                        <Hill key="Hill" position={{x: 0, y: 50}} width={400} height={530} />
                    ]
                }
                Vehicles={this.renderTanks()}
                Projectiles={
                    [
                        this.renderBullets(),
                        this.renderExplosions()
                    ]
                }
                
                trackMouse={ event => this.trackMouse(event) }
                ScoreBoard={
                    [   
                        <Health key="playerOneHealth" position={{x: 700, y: -1000}} lives={this.playerOneHealth()} />,
                        <Health key="playerTwoHealth" position={{x: -700, y: -1000}} lives={this.playerTwoHealth()} />
                    ]
                }
                message={this.state.gameOverMessage}
                shoot={this.shoot}
                leaveGame={this.leaveGame}
            />
        )
    }
}

const mapStateToProps = ( {games, user}, ownProps) => {
    return { 
        game: games.find(game => parseInt(game.id) === parseInt(ownProps.id) ),
        user
    }
}

 const mapDispatchToProps = dispatch => ({
    endTurn: (gameId) => dispatch(endTurn(gameId)),
    registerHit: (username, gameId) => dispatch(registerHit(username, gameId)),
    updateGame: (data) => dispatch(manualGameUpdate(data))
 })

export default connect(mapStateToProps, mapDispatchToProps)(TankGame)