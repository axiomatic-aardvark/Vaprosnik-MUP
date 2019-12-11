import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Questions from './components/Questions';
import AddQuestion from './components/Questions';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/swap" component={Questions} />
				<Route path="/user" component={AddQuestion} />
			</Switch>
		</Router>
	);
}

export default App;
