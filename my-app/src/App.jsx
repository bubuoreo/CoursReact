import React, { useState } from 'react';

import './lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import * as jsonSource from './sources/robots_parts.json';

import { LeftSide } from './components/LeftSide/LeftSide';
import { MiddleSide } from './components/MiddleSide/MiddleSide';
import { useDispatch } from 'react-redux';
import { load_parts } from './slices/partSlice';
import { load_robots } from './slices/robotSlice';
import { RightSide } from './components/RightSide/rightSide';


export const App = (props) => {
    const [robots, setRobots] = useState(jsonSource.default);
    const [selectedRobotId, setSelectedRobotId] = useState(0);
    const [selectedParts, setSelectedParts] = useState([]);

    const dispatch = useDispatch();

    dispatch(load_robots(robots.robots))
    dispatch(load_parts(robots.parts))

    return (
        <div className="container-fluid">
            <div className="row">
                <h1> Welcome to robot shop</h1>
            </div>
            <div className="row">
                <div className="col-md-4 col-lg-4" >
                    <LeftSide />
                </div>
                <div className="col-md-4 col-lg-4" >
                    <MiddleSide />
                </div>
                <div className="col-md-4 col-lg-4" >
                    <RightSide/>
                </div>
            </div>
        </div>
    );
}