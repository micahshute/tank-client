import React from 'react'
import  { pathFromBezierCurve } from '../utils/formulas'

const Hill = (props) => {

    const style= {
        fill: '#a16012',
        stroke: '#7545e'
    }

    const baseWidth = props.width || 400 
    const halfBase = baseWidth / 2
    const height = props.height || 150
    const controlPoint = baseWidth / 3

    const cubicBezierCurve = {

        initialAxis: {
            x: props.position.x - halfBase,
            y: props.position.y
        },
        initialControlPoint: {
            x: controlPoint,
            y: -height
        },
        endingControlPoint: {
            x: baseWidth - controlPoint, 
            y: -height
        },
        endingAxis: {
            x: baseWidth,
            y: 0
        }   
    }

    return (
        <path 
            style={style}
            d={pathFromBezierCurve(cubicBezierCurve)}
        />
    )
}

export default Hill