import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'

export default function AddClientModal(props) {
  const [company, setCompany] = useState({companyName:''});
  const [error, setError] = useState({companyName:''});

  // Make sure input is not blank on submit
  const validate = () => {
    if (company.companyName === '') {
      setError({...error, companyName: 'Submission cannot be blank.'});
      return false;
    };
    setError({...error, companyName:''});
    return true;
  }

  const changeHandler = (e) => {
    setCompany({...company, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    // Add check for if company already exists in the database
    props.addNewCompany(company);
    props.closeModal();
  }

  return(
      <Modal show={props.modalIsOpen} onHide={props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Company</Modal.Title>
        </Modal.Header>
          <Form className="form-container" style={{width: "100%"}}>
            <Modal.Body>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" name="companyName" as="input" onChange={changeHandler} autoComplete="off"></Form.Control>
                <section className="register-validation">{error.companyName}</section>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.closeModal}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </Modal.Footer>
          </Form>
      </Modal>
  )
}