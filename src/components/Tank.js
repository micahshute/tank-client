import React from 'react'
import CannonPipe from './CannonPipe'
import CannonBase from './CannonBase'

const Tank = props => {

    const angle = props.angle === undefined ? 45 : props.angle
    
    return (
        <React.Fragment>
            <CannonPipe position={props.position} rotation={angle}/>
            <CannonBase position={props.position} color={props.color} />
        </React.Fragment>
        
    )
}

export default Tank