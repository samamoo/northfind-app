import React, { useRef, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './Login.scss';

export default function Login () {
  axios.defaults.withCredentials = true;
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState ( {
    email: '',
    password: '',
  })
  const [user, setUser] = useState(
    { email: '',
      password: ''
    })
  
  const validate = () => {
    if (user.email === "") {
      setError({...error, email: "Email cannot be blank."});
      return false;
    }
    if (user.password === "") {
      setError({...error, password: "You must provide a password."});
      return false;
    }
    if (!user.email.includes("@north-find.com")) {
      setError({...error, email: "Please enter a valid email"});
      return false;
    }
    setError({...error, email:'', password: ''})
    return true;
  }

  const changeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate()) {
      console.log("wrong password or something")
      return;
    };
    axios.post("http://localhost:9000/api/login/", user )
    .then (res => {
      console.log(res, "Data from Login.js")
      if (!res.data) {
        console.log("wrong login")
        return;
      }
      setRedirect(true);
    })
    // Axios request to db to get the User's information and set session cookie.
  }

  return (
    <div className="loginpage">
      <Form className="form-container">
        <h1>Sign In</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" as="input" autoComplete="off" placeholder="Enter email" onChange = {changeHandler}/>
          <section className="register-validation">{error.email}</section>
          {/* <Form.Text className="text-muted">
            
          </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" as="input" autoComplete="off" placeholder="Password" onChange = {changeHandler}/>
          <section className="register-validation">{error.password}</section>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        { redirect && <Redirect to={{
              pathname: '/'
            }}/>}
      </Form>
      <Link to={"/register"}>Don't have an account? Register Here</Link>
    </div>
  )
}