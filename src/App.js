import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Questions from './components/Questions';
import AddQuestion from './components/AddQuestion';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/questions" exact component={Questions} />
				<Route path="/addQuestion" exact component={AddQuestion} />
			</Switch>
		</Router>
	);
}

export default App;
