import { useState } from 'react';
import './App.css'
import LeftSide from './components/LeftSide/LeftSide'
import MiddleSide from './components/MiddleSide/MiddleSide';
import * as jsonSource from './sources/robots_parts.json';


export const App = (props) => {
	
	const [robotsList, setRobots] = useState(jsonSource.default);

	let parts = [];

	function handleRobotClick (id) {
		console.log(id);
		const robotParts = robotsList.robots[id].parts
		console.log(parts);
		parts = robotParts;
	}


	return (
		<div className="container-fluid">
			<div className="row">
				<h1> Welcome to robot shop</h1>
			</div>
			<div className="row">
				<div className="col-md-4 col-lg-4" >
					<LeftSide 
						robots={robotsList}
						handleRobotClick={handleRobotClick}
					/>
				</div>
				<div className="col-md-4 col-lg-4" >
					<MiddleSide parts={parts}/>
				</div>
				<div className="col-md-4 col-lg-4" >
				
				</div>
			</div>
      </div>
	);
}

export default App
