import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './Login.scss';

export default function Login () {
  const [user, setUser] = useState(
    { email: '',
      password: ''
    })
  const email = useRef(null);
  const password = useRef(null);

  const changeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  console.log(user)

  return (
    <div className="loginpage">
      <Form className="form-container">
        <h1>Sign In</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" as="input" autoComplete="off" placeholder="Enter email" ref={email} onChange = {changeHandler}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" as="input" autoComplete="off" placeholder="Password" ref={password} onChange = {changeHandler}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}