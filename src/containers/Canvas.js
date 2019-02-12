import React, { Component } from 'react'
import Sky from '../components/Sky'
import Ground from '../components/Ground'
import CannonBase from '../components/CannonBase'
import CannonPipe from '../components/CannonPipe'

class Canvas extends Component{

    render(){
        const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];

        return(
            <svg
                id="tank-canvas"
                preserveAspectRatio="xMaxYMax none"
                viewBox={viewBox}
            >
                <Sky />
                <Ground />
                <CannonPipe rotation={0}/>
                <CannonBase />
               
            </svg>
        )
    }

}

const style = {
    border: '1px solid white'
}

export default Canvas