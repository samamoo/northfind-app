import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './ClientForm.scss';

export default function ClientForm () {
  const [redirect, setRedirect] = useState(false);
  const [client, setClient] = useState({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
    })
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: ''
  })
  const changeHandler = (e) => {
    setClient({...client, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/api/clients/", client )
    .then (res => {
      console.log(res, "Added new data")
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <main className="clientform">
      <div className="clientformpage">
      <Form className="form-container">
        <h4>Please fill out client information or select from an existing client</h4>
        <hr/>
        {/* Search for client from database */}
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" as="input" onChange = {changeHandler}></Form.Control>
          <section className="register-validation">{error.firstName}</section>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" as="input" onChange = {changeHandler}></Form.Control>
          <section className="register-validation">{error.lastName}</section>
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" name="companyName" as="input" onChange = {changeHandler}></Form.Control>
          <section className="register-validation">{error.companyName}</section>
        </Form.Group>
        
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" as="input" autoComplete="off" onChange = {changeHandler}/>
          <section className="register-validation">{error.email}</section>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit Client
        </Button>
      </Form>
    </div>
    </main>
  )
}