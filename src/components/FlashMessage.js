import React from 'react'


const FlashMessage = props => {

    const flashClass = () => {
        switch(props.type){
            case "danger":
                return "flash flash-danger"
            default:
                return "flash flash-default"
        }
    }

    return props.msg === "" ? null : (
        <div className={flashClass()}>
            <p>{props.msg}</p>
        </div>
    )
}

export default FlashMessage