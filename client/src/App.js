import React from 'react';
import useApplicationData from './hooks/useApplicationData';
import AdminClient from './pages/admin/clients/AdminClient';
import AdminQuestions from './pages/admin/AdminQuestions';
import Navigation from "./components/Navigation";
import ClientForm from './pages/ClientForm';
import Confirmation from './pages/Confirmation';
import End from './pages/End';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Login from './pages/Login';
import Profile from './pages/Profile';
import QuestionSelection from './pages/QuestionSelection';
import Register from './pages/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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
        <Route path="/clientform" exact render={(props) => <ClientForm {...props} state={state}/>}/>
        <Route path="/interview" exact component={Interview}/>
        <Route path="/confirmation" exact component={Confirmation}/>
        <Route path="/question-selection" exact component={QuestionSelection}/>
        <Route path="/end" exact component={End}/>
        <Route path="/" exact component={Home}/>
        <Route path="/admin-client" exact component={AdminClient}/>
        <Route path="/admin-questions" exact component={AdminQuestions}/>
      </Switch>
    </Router>
  );
}

export default App;
