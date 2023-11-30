import React, { Component } from 'react';
import {Robot} from '../Robot/Robot';
import { useSelector } from 'react-redux';

export const LeftSide =(props)=>{

    let robots = useSelector(state => state.robotR.robots)
    
    function getAllRobotRender(){
        let array_render=[];
        
        for(var i=0;i<robots.length;i++){
            
            array_render.push(
                <Robot
                   key={i}
                   robot={robots[i]}
                />
                );
        }
        return array_render;
    }

    const display_list = getAllRobotRender();
    return (
            <div>
               {display_list}
            </div>
    );
}