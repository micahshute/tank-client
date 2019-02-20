import React from 'react'
import Heart from './Heart'

const Health = props => {

    const renderHearts = () => {
        switch(props.lives){

            case 0: 
                return null
            case 1: 
                return <Heart position={props.position} />
            case 2:
                return ([
                    <Heart key="1" position={props.position} />,
                    <Heart key="2"position={{x: props.position.x + 50, y: props.position.y}} />
                ])
            case 3:
                return ([
                <Heart key="1" position={props.position} />,
                <Heart key="2" position={{x: props.position.x + 50, y: props.position.y}} />,
                <Heart key="3" position={{x: props.position.x + 100, y: props.position.y }}/>
                ])
        }
    }

    return (
        <React.Fragment>
            {renderHearts()}
        </React.Fragment>
       
    )
}

export default Health