import React from 'react';


function Button(props) {
    const { name, btnEvent } = props
    return (
        <div>
            <button type="button" className="button" onClick = {btnEvent}>{name}</button>
        </div>
    )
}

export default Button;
