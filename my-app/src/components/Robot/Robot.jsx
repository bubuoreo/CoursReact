import { useState } from 'react';
import Label from './containers/Label';
import Visual from './containers/Visual';

export const Robot = (props) => {

    const idRobot = props.robot.id;

    function handleRobotClick (e) {
        props.handleRobotClick(idRobot)
    }

	return (
		<div className="panel panel-default" onClick={handleRobotClick}>
            <div className="panel-heading">
                <h3 className="panel-title">Robot {idRobot} description</h3>
            </div>
            <div className="panel-body">
                <Label 
                    title={props.robot.title} 
                    id={props.robot.id} 
                />
                <Visual 
                    type={props.robot.visual_type} 
                    src={props.robot.visual_src}
                />
            </div>
        </div>
	);
}

export default Robot
