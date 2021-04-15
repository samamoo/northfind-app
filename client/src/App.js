import React, { useEffect, useState } from 'react';
import useApplicationData from './hooks/useApplicationData';
import Navigation from "./components/Navigation";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientForm from './pages/ClientForm';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const { state, logout } = useApplicationData();

  return (
    <Router>
      <Navigation state={state} logout={logout}/>
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
