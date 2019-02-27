import React from 'react'

export const SelectableUser = props => {

    const style = {
        border: "1px solid rgb(255, 0 ,100)",
        borderRadius: "5px",
        padding: '5px',
        minWidth: "30%",
    }

    return(
        <div className="SelectableUser" style={style} onClick={() => props.onSelect(props.username)}>
            <p>{props.username}</p>
        </div>
    )
}