import React from 'react';
import { Part } from '../Part/Part';
import { useSelector } from "react-redux";

export const MiddleSide = (props) => {

    let current_robot = useSelector(state => state.robotR.current_robot);
    let partLists = useSelector(state => state.partsR.parts);

    let parts = current_robot.parts

    function getPartObject(id) {
        for (var i = 0; i < partLists.length; i++) {
            if (partLists[i].id == id) {
                return partLists[i];
            }
        }
        return {};
    }

    function getAllPartRender() {
        let array_render = [];
        if (parts == undefined)
            return;
        for (var i = 0; i < parts.length; i++) {
            let obj = getPartObject(parts[i]);
            array_render.push(
                <Part
                    key={i}
                    part={obj}
                />
            );
        }
        return array_render;
    }

    const display_list = getAllPartRender();

    return (
        <div>
            {display_list}
        </div>
    );
}