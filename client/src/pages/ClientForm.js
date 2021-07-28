import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import './ClientForm.scss';

export default function ClientForm (props) {
  let clientId;
  const user = props.state.userData;
  const [redirect, setRedirect] = useState(false);
  const [session_id, setSession_id] = useState(null);
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

  useEffect(() => {
    axios.get('http://localhost:9000/api/company/')
    .then(res => {
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
    // Create a new client
    axios.post("http://localhost:9000/api/clients/", client )
    .then ((res) => {
      clientId = res.data.id;
      const userId = user.id;
      const session = { clientId, userId}
      // Create an interview session
      axios.post("http://localhost:9000/api/interview", session)
      .then ((res) => {
        setSession_id(res.data.id);
        setRedirect(true);
      })
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
          { redirect && <Redirect  to={{pathname:"/question-selection", state:{session_id}}}/>}
        </Form>
      </div>
    </main>
  )
}