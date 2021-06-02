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
  const [companyList, setCompanyList] = useState({
    companies: [],
    selectedClient: ''
  });
  // Find a way to filter out repeating clients!!!!!!!!!!!!

  useEffect(() => {
    axios.get('http://localhost:9000/api/company/')
    .then(res => {
      console.log(res.data)
      setCompanyList((prev) => ({...prev, companies: res.data}))
    })
  },[]);

  const validate = () => {
    if (client.firstName === '') {
      setError({...error, firstName: 'You must enter a name.'});
      return false;
    }
    if (client.lastName === '') {
      setError({...error, lastName: 'You must enter a name.'});
      return false;
    }
    if (client.companyName === '') {
      setError({...error, companyName: 'You must select a company.'});
      return false;
    }
    if (client.email === '') {
      setError({...error, email: 'You must enter an email.'});
      return false;
    }
    setError({...error, firstName:'', lastName:'', companyName: '', email:''});
    return true;
  }
  // Set client from dropdown
  const selectClient = (e) => {
    setClient(() => ({...client, companyName: e.target.innerHTML }));
  }

  // Submit new client
  const changeHandler = (e) => {
    setClient({...client, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    } 
    console.log(client)
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
            {/* <Form.Control type="text" name="companyName" as="input" onChange = {changeHandler} value={client.companyName}></Form.Control> */}
            <InputGroup className="mb-3">
              <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title="Select" id="input-group-dropdown-1">
              {companyList.companies.map((company) => {
                return (
                  <Dropdown.Item key={company.id} value={company.company_name} onClick={selectClient}>{company.company_name}</Dropdown.Item>
                  )
                })}
              </DropdownButton>
            <Form.Control type="text" name="companyName" as="input" aria-describedby="basic-addon1" defaultValue={client.companyName} autoComplete="off" readOnly/>
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