import React from 'react'
import { skyAndGroundWidth } from '../utils/constants'

const Sky = () => {

    const skyWidth = skyAndGroundWidth
    const gameHeight = 1200

    return(
        <rect
            id="sky"
            x={skyWidth / -2}
            y={100 - gameHeight}
            width={skyWidth}
            height={gameHeight}
        />
    )
}

export default Sky