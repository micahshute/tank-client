import React from 'react'
import { gameWidth } from '../utils/constants'

const StartGame = props => {

    const button = {
        x: gameWidth / -2,
        y: -200,
        width: gameWidth,
        height: 200,
        rx: 10,
        ry: 10,
        style: {
            fill: 'transparent',
            cursor: 'pointer'
        },
        onClick: props.onClick
    }

    const text = {
        textAnchor: 'middle',
        x: 0,
        y: -150,
        style: {
            fontFamily: '"Joti One", cursive',
            fontSize: 60, 
            fill: '#e3e3e3',
            cursor: 'pointer'
        },
        conClick: props.onClick
    }

    return (
        <g filter="url(#shadow)">
            <ret {...button } />
            <text {...text } >
                Start Game!
            </text>
        </g>
    )

}

export default StartGame