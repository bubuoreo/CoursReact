import React from 'react';
import {Description} from './containers/Description';
import { useDispatch } from 'react-redux';
import { update_selected_part } from '../../slices/partSlice'

export const Part=(props)=>{

    let dispatch = useDispatch()

    function handleOnPartClick(part) {
        dispatch(update_selected_part(part))
    }

    return (
        <div className="panel panel-default" onClick={() => handleOnPartClick(props.part)}>
            <div className="panel-heading">
                <h3 className="panel-title">Part {props.part.id} description</h3>
            </div>
            <div className="panel-body">
                <Description 
                    part={props.part} 
                />
            </div>
        </div>
);
}