import React from 'react'

const Card = props => {

    const style = {
        width: "100%",
        justifyContent: "center",
        alignItems: "space-around",
        border: "1px solid #fffff0",
        borderRadius: "5px",
        borderWidth: "3px",
        borderColor: "rgb(32, 255, 32)",
        color: "rgb(32, 255, 32)",
        background: "#00000f",
        cursor: "pointer",
        padding: "5px",
        margin: "10px"
    }

    const renderDetails = () => {
        return Object.keys(props.details).map(key => {
            console.log(key)
            return(
                <p key={key}><strong>{key}: </strong> {props.details[key]}</p>
            )
        })
    }

    return (
        <div style={style} onClick={(e) => props.onClick(props.id, e) }>
            <h3>{props.title}</h3>
            <hr />
            {renderDetails()}
            <hr />
            <p>{props.footerDetails}</p>
        </div>
    )
}

export default Card