import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.scss';


export default function Register () {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [user, setUser ] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',

    }
  )

  const changeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) { //if user does not pass validation, return.
      return;
    }
      console.log(user)
    // Axios request to db to get the User's information and set session cookie.
    axios.post("http://localhost:9000/api/users/",  user )
    .then (res => {
      console.log(res, "The response from post to users")
      setRedirect(true);
    })
  }

  const validate = () => {
    if (user.firstName === "") {
      setError({...error, firstName: "This field cannot be blank"});
      return false;
    }
    if (user.lastName === "") {
      setError({...error, lastName: "This field cannot be blank"});
      return false;
    }
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
    setError({...error, firstName:'', lastName: '', email:'', password:''})
    return true;
  }

  return (
    <div className="registerpage">
      <Form className="form-container">
        <h1>Register</h1>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" as="input" onChange = {changeHandler}></Form.Control>
          <section className="register-validation">{error.firstName}</section>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" as="input" onChange = {changeHandler}></Form.Control>
          <section className="register-validation">{error.lastName}</section>
        </Form.Group>
        
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" as="input" autoComplete="off" onChange = {changeHandler}/>
          <section className="register-validation">{error.email}</section>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" as="input" autoComplete="off" onChange = {changeHandler}/>
          <section className="register-validation">{error.password}</section>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        { redirect && <Redirect to={{
              pathname: '/'
            }}/>}
      </Form>
      <Link to={"/login"} className="account-question">Have an account? Login Here</Link>
    </div>
  )
}