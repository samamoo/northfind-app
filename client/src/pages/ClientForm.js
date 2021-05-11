import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, FormControl, Button, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import axios from 'axios';
import { titleCase } from '../helpers/helpers';
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
  });
  const [clientList, setClientList] = useState({
    clients: [],
    selectedClient: ''
  });
  // Find a way to filter out repeating clients!!!!!!!!!!!!

  useEffect(() => {
    axios.get('http://localhost:9000/api/clients/')
    .then(res => {
      setClientList((prev) => ({...prev, clients: res.data}))
    })
  },[]);

  // Set client from dropdown
  const selectClient = function(e) {
    setClient(() => ({...client, companyName: e.target.innerHTML }))
  }

  // Submit new client
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
            <Form.Label>Company Name <strong>or</strong> Select from existing clients</Form.Label>
            {/* <Form.Control type="text" name="companyName" as="input" onChange = {changeHandler} value={client.companyName}></Form.Control> */}
            <InputGroup className="mb-3">
              <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title="Select" id="input-group-dropdown-1">
              {clientList.clients.map((clientItem) => {
                return (
                  <Dropdown.Item value={clientItem.company} onClick={selectClient}>{titleCase(clientItem.company)}</Dropdown.Item>
                  )
                })}
              </DropdownButton>
            <Form.Control type="text" name="companyName" as="input" aria-describedby="basic-addon1" value={client.companyName} autocomplete="off" onChange = {changeHandler}/>
            </InputGroup>
            <section className="register-validation">{error.companyName}</section>
          </Form.Group>
          
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" as="input" autoComplete="off" onChange={changeHandler}/>
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