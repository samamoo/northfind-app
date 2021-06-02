import React from 'react';
import useApplicationData from './hooks/useApplicationData';
import Navigation from "./components/Navigation";
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ClientForm from './pages/ClientForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AdminClient from './pages/admin/AdminClient';

function App() {
  const { state, logoutUser, loginUser } = useApplicationData();
  console.log(state)

  return (
    <Router>
      <Navigation state={state} logout={logoutUser}/>
      <Switch>
        <Route path="/login" exact render={(props) => <Login {...props} loginUser={loginUser} state={state} />}/>
        <Route path="/profile" exact render={(props) => <Profile {...props} state={state}/>}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/clientform" exact component={ClientForm}/>
        <Route path="/" exact component={Home}/>
        <Route path="/admin-client" exact component={AdminClient}/>
      </Switch>
    </Router>
  );
}

export default App;
