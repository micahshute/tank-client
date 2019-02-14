import React, { Component } from 'react'
import StartGame from '../components/StartGame'

class Canvas extends Component{

    renderVehicles = () => {
        return this.props.Vehicles.map(v => <v />)
    }

    render(){
        const gameHeight = 1200;
const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
        const { Environment, Vehicles, Projectiles, ScoreBoard } = this.props
        return(
            <svg
                id="canvas"
                preserveAspectRatio="xMaxYMax none"
                onMouseMove={this.props.trackMouse}
                viewBox={viewBox}
            >

                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" />
                    </filter>
                </defs>
                {Environment}
                
                {Vehicles}
                {ScoreBoard}
                {Projectiles}
            </svg>
        )
    }

}

const style = {
    border: '1px solid white'
}

export default Canvas