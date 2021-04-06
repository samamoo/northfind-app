import React from 'react';
import Navigation from "./components/Navigation";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientForm from './pages/ClientForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/clientform" exact component={ClientForm}/>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
