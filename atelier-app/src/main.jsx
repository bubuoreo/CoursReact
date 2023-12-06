import React from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App.jsx';
import myStore from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={myStore}>
			<App />
		</Provider>
	</React.StrictMode>,
)
