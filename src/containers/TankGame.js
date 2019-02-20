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

class TankGame extends Component{

    constructor(props){
        super(props)
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
            canShoot: true,
            gameOverMessage: "",
            redirectToHome: false
        }
        this.canvasMousePosition = 0
        this.setAngle = this.setAngle.bind(this)
        this.updateBullets = this.updateBullets.bind(this)
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.setAngle()
            this.updateBullets()
            this.checkTurnEnd()
        }, 10)

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
        clearInterval(this.interval)
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
            canShoot: true,
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
        const victim = this.inactivePlayer()
        this.props.registerHit(this.inactivePlayer() + 1, this.props.id)
        this.setState({
            canShoot: true,
            activeBullet: undefined,
            explosion: {
                position: this.state.tanks[victim].position
            }
        }, this.checkWin)
    }

    checkWin = () => {
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
        return this.props.game.opponent.player == 1 ? this.props.opponent.username : this.props.user.username
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
    registerHit: (username, gameId) => dispatch(registerHit(username, gameId))
 })

export default connect(mapStateToProps, mapDispatchToProps)(TankGame)