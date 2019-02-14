import React from 'react'
import FlyingObjectBase from './FlyingObjectBase'
import FlyingObjectTop from './FlyingObjectTop'


const FlyingObject = props => (
    <g>
        <FlyingObjectBase position={props.position} />
        <FlyingObjectTop position={props.position} />
    </g>
)

export default FlyingObject