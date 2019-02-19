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
                    user: 0,
                    lives: 3
                },
                {
                    position: {
                        x: -700,
                        y: 0
                    },
                    angle: 45,
                    color: 'red',
                    user: 1,
                    lives: 3
                }
            ],
            activeExplosion: undefined,
            turns: 0,
            activeBullet: undefined,
            canShoot: true,
            gameOverMessage: ""
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
            cnv.style.width = `${window.innerWidth}px`;
            cnv.style.height = `${window.innerHeight}px`;
          };
        window.onresize();
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    checkTurnEnd = () => {
        if(this.state.activeBullet === undefined) return 
        const activeBullet = this.state.bullets[this.state.activeBullet]
        // console.log(activeBullet)
        if(activeBullet.velocity.x === 0 && activeBullet.velocity.y === 0){
            this.updateTurn()
        }
    }

    updateTurn = () => {
        this.setState({
            turns: this.state.turns + 1,
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
        const updatedTanks = [...this.state.tanks]
        updatedTanks[this.inactivePlayer()].lives -= 1
        this.setState({
            score: this.state.score + 1,
            turns: this.state.turns + 1,
            canShoot: true,
            activeBullet: undefined,
            tanks: updatedTanks,
            explosion: {
                position: updatedTanks[this.inactivePlayer()].position
            }
        }, this.checkWin)
    }

    checkWin = () => {
        if(this.state.tanks[0].lives === 0){
            this.setState({
                canShoot: false,
                gameOverMessage: `Red Wins!`
            })
        }else if(this.state.tanks[1].lives === 0){
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
        return this.state.turns % 2 
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
        return this.state.tanks.map(tankData => <Tank {...tankData} /> )
    }

    renderBullets = () => {
        return this.state.bullets.map(b => <Bullet position={b.position}/>)
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

    render(){
        return(
            <Canvas 
                Environment={
                    [
                        <Sky />,
                        <Ground />,
                        <Hill position={{x: 0, y: 50}} width={400} height={530} />
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
                        <Health position={{x: 700, y: -1000}} lives={this.state.tanks[0].lives} />,
                        <Health position={{x: -700, y: -1000}} lives={this.state.tanks[1].lives} />
                    ]
                }
                message={this.state.gameOverMessage}
                shoot={this.shoot}
            />
        )
    }
}

export default TankGame