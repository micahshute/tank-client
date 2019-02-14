import React from 'react'

const Bullet = props => {

    const bulletStyle = {
        fill: "#777",
        stroke: "#444",
        strokeWidth: '2px'
    }

    return (
        <ellipse
            style={bulletStyle}
            cx={props.position.x}
            cy={props.position.y}
            rx="8"
            ry="8"
        />
    )

}

export default Bullet