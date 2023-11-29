import { useState } from 'react';
import './App.css'
import LeftSide from './components/LeftSide/LeftSide'
import * as jsonSource from './sources/robots.json';


export const App = (props) => {

	const [robotsList, setRobots] = useState(jsonSource.default);

	return (
		<div className="container-fluid">
			<div className="row">
				<h1> Welcome to robot shop</h1>
			</div>
			<div className="row">
				<div className="col-md-4 col-lg-4" >
					<LeftSide robots={robotsList.robots}/>
				</div>
				<div className="col-md-4 col-lg-4" >
				
				</div>
				<div className="col-md-4 col-lg-4" >
				
				</div>
			</div>
      </div>
	);
}

export default App
