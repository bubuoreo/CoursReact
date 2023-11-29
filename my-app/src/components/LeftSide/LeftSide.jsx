import { useState } from 'react';
import Robot from '../Robot/Robot';

export const LeftSide = (props) => {

    const robotsList = props.robots;

    let display = robotsList.map(
        (robot) =>
            <div key={robotsList.id} >
                <Robot 
                    robot={robot}
                />
            </div>
    );

    return (
        <div>
            {display}
        </div>
    );
}

export default LeftSide
