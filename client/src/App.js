import React from 'react';
import Navigation from "./components/Navigation";
import Home from './Home';
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
      </Switch>
      <div className="App">
        <h1>Hello</h1>
      </div>
    </Router>
  );
}

export default App;
