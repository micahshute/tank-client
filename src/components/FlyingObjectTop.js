import React from 'react'

const FlyingObjectBase = props => {

    const style = {
        fill: '#979797',
        stroke: '#5c5c5c'
    }

    return(
        <ellipse 
            cx={props.position.x}
            cy={props.position.y}
            rx="40"
            ry="10"
            style={style}
        />
    )
}

export default FlyingObjectBase