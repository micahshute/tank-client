import React from 'react'
import CannonPipe from './CannonPipe'
import CannonBase from './CannonBase'

const Tank = props => {

    const angle = props.angle === undefined ? 45 : props.angle

    return (
        <React.Fragment>
            <CannonPipe rotation={angle}/>
            <CannonBase />
        </React.Fragment>
        
    )
}

export default Tank