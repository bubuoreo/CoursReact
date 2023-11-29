import { useState } from 'react';

export const MiddleSide = (props) => {

    function getRender() {
        if (props.parts == undefined) {
            return ("MIDDLESIDE")
        }
        else {
            return (props.parts)
        }
    }

    let display = getRender()

    return (
        <div>
            <h3>{display}</h3>
        </div>
    );
}

export default MiddleSide
