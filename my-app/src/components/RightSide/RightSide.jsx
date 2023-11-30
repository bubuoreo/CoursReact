import React from 'react';
import { Panel } from './containers/Panel'
import { useSelector } from 'react-redux';

export const RightSide = (props) => {

    let part = useSelector(state => state.partsR.current_part)

    console.log(part)

    function getPartRender() {
        if (part == undefined) {
            return;
        }
        return (<Panel part={part}/>)
    }

    let display = getPartRender();

    return (
        <div>
            {display}
        </div>
    );
}