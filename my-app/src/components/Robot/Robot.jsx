import React, { useState } from 'react';
import {Label} from './containers/Label';
import {Visual} from './containers/Visual';
import { useDispatch } from 'react-redux';
import { update_selected_robot } from '../../slices/robotSlice'
import { update_selected_part } from '../../slices/partSlice';

export const Robot =(props) =>{

    const dispatch = useDispatch();

    function handleOnRobotSelected(robot) {
        console.log("Le robot sélectionné est : ",robot.id);
        dispatch(update_selected_robot(robot))
    }

    return (
        <div className="panel panel-default" onClick={() => handleOnRobotSelected(props.robot)}>
            <div className="panel-heading">
                <h3 className="panel-title">Robot {props.id} description</h3>
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
