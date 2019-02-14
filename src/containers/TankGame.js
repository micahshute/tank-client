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
import PhysicsMachine from '../utils/earth_physics_machine'
import EarthPhysicsMachine from '../utils/earth_physics_machine';


class TankGame extends Component{

    constructor(props){
        super(props)
        this.state = {
            angle: 45,
            bullets: [
                {
                    position: {
                        x: 200,
                        y: -800
                    },
                    velocity: {
                        x: 200,
                        y: 0
                    }
                }
            ],
            score: 0
        }
        this.canvasMousePosition = 0
        this.setAngle = this.setAngle.bind(this)
        this.updateBullets = this.updateBullets.bind(this)
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.setAngle()
            this.updateBullets()
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

    shoot = () => {
        const newBullet = {
            position: EarthPhysicsMachine.calculateBarrelExitPiont(this.state.angle),
            velocity: EarthPhysicsMachine.calculateVelocityVector({velocity: 1000, angle: this.state.angle})
        }

        this.setState({
            bullets: [...this.state.bullets, newBullet]
        })
    }

    updateBullets = () => {
        let bullets = [...this.state.bullets]
        let target = {position: {x: -800, y: 50}, width: 200, height: 75}
        bullets = bullets.filter(b => {
            let collision =!EarthPhysicsMachine.testCollision({...b, type: "bullet"}, target)
            if(!collision){
                this.collisionOccurred()
            }
            return collision
            
        })
        let updatedBullets = bullets.map(bullet => {
            const { position, velocity } = PhysicsMachine.update2DLocation(bullet)
            return { position, velocity }
        })
        this.setState({
            bullets: updatedBullets
        })
    }

    collisionOccurred = () => {
        this.setState({
            score: this.state.score + 1
        })
    }

    setAngle = () => {
        const { x, y } = this.canvasMousePosition
        this.setState({
            angle: calculateAngle(0,0,x,y)
        })
    }

    renderTanks = () => {
        return [
            <Tank angle={this.state.angle} />
        ]
    }

    renderBullets = () => {
        return this.state.bullets.map(b => <Bullet position={b.position}/>)
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
                        <Ground />
                    ]
                }
                Vehicles={this.renderTanks()}
                Projectiles={this.renderBullets()}
                trackMouse={ event => this.trackMouse(event) }
                ScoreBoard={
                    [   
                        <ScoreBoard score={this.state.score} />
                    ]
                }
                shoot={this.shoot}
            />
        )
    }
}

export default TankGame