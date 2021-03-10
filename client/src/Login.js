import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.scss';

export default function Login () {
  const [user, setUser] = useState(
    { email: '',
      password: ''
    })
  const email = useRef(null);
  const password = useRef(null);
  return (
    <div className="loginpage">
      <Form>
        <h1>Sign In</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={email}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={password}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}