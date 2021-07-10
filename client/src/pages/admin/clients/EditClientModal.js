import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditClientModal(props) {
  const [company, setCompany] = useState({
    id: props.editModalIsOpen.id,
    companyName: props.editModalIsOpen.companyName,
  });
  const [error, setError] = useState({companyName:''});

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
    props.editCompany(company);
    setCompany((prev) => ({...prev, id: null, companyName: ''}))
    props.closeEditModal();
  }

  return(
    <Modal show={props.editModalIsOpen.open} onHide={props.closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
          <Form className="form-container" style={{width: "100%"}}>
            <Modal.Body>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" defaultValue={props.editModalIsOpen.companyName} name="companyName" as="input" onChange={changeHandler} autoComplete="off"></Form.Control>
                <section className="register-validation">{error.companyName}</section>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.closeEditModal}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </Modal.Footer>
          </Form>
      </Modal>

  )
}