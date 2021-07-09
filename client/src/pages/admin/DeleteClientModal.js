import React from 'react';
import { Modal, Col, Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default function DeleteClientModal(props) {
  const id = props.deleteModalIsOpen.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.deleteCompany(id);
    props.closeDeleteModal();
  }
  return(
    <Modal show={props.deleteModalIsOpen.open} onHide={props.closeDeleteModal}>
        <Modal.Header>
        <Modal.Title>Please Confirm</Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <div>Are you sure you want to delete this company?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeDeleteModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Delete</Button>
        </Modal.Footer>
     
    </Modal>
  )
}