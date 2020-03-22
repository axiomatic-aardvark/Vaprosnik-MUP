import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalState from "./components/GlobalState";
import Home from "./components/Home";
import Questions from "./components/Questions";
import AddQuestion from "./components/AddQuestion";
import EditQuestion from "./components/EditQuestion";
import DeleteQuestion from "./components/DeleteQuestion";

import "./App.scss";

function App() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE
  };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <GlobalState>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/questions" exact component={Questions} />
            <Route path="/addQuestion" exact component={AddQuestion} />
            <Route path="/editQuestion/" exact component={EditQuestion} />
            <Route path="/deleteQuestion/" exact component={DeleteQuestion} />
          </Switch>
        </Router>
      </GlobalState>
    </AlertProvider>
  );
}

export default App;
