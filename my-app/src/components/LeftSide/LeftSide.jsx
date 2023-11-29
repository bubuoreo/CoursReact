import { useState } from 'react';
import Robot from '../Robot/Robot';

export const LeftSide = (props) => {

    let display = props.robots.robots.map(
        (robot) =>
            <div key={props.robots.robots.id}>
                <Robot 
                    robot={robot}
                    handleRobotClick={props.handleRobotClick}
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
