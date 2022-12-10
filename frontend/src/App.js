import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
