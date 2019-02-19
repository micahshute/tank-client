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
                onClick={this.props.shoot}
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

                <g filter="url(#shadow)">
                    <text style={{ 
                        fontFamily: '"Joti One", cursive',
                        fontSize: 80,
                        fill: '#d6d33e'
                    }} x="-200" y="-800">
                        {this.props.message}
                    </text>
                </g>
            </svg>
        )
    }

}
 
const style = { 
    border: '1px solid white'
}

export default Canvas