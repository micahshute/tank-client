import React from 'react'
import { pathFromBezierCurve } from '../utils/formulas'

const CannonBase = (props) => {
    
    const cannonBaseStyle= {
        fill: (props.color || '#4b5320'),
        stroke: '#7545e',
        strokeWidth: '2px'
    }

    const treadStyle= {
        fill: '#b6b6b6',
        stroke: '#7d7d7d'
    }


    const baseWidth = 80
    const halfBase = 40

    const tankLength = 110
    const tankHeight = 50


    return (
        <g>
             <rect
                style={cannonBaseStyle}
                x={props.position.x - halfBase}
                y={props.position.y - 20}
                width={baseWidth}
                height={tankHeight}
             />
             <rect 
                style={cannonBaseStyle}
                x={props.position.x - tankLength / 2}
                y={props.position.y }
                width={tankLength}
                height={tankHeight}
            />
            <ellipse 
                cx={props.position.x}
                cy={props.position.y + tankHeight}
                rx="50"
                ry="20"
                style={treadStyle}
            />
        </g>
    )

}

export default CannonBase;