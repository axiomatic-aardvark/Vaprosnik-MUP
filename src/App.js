import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalState from './components/GlobalState';
import Home from './components/Home';
import Questions from './components/Questions';
import AddQuestion from './components/AddQuestion';

function App() {
	return (
		<GlobalState>
			<Router>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/questions" exact component={Questions} />
					<Route path="/addQuestion" exact component={AddQuestion} />
				</Switch>
			</Router>
		</GlobalState>
	);
}

export default App;
