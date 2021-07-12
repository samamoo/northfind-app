import React from 'react';
import { Modal, Col, Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default function DeleteConfirmation(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.deleteQuestion(props.confirmationModalIsOpen.id);
    props.closeConfirmationModal();
  }
  return(
    <Modal show={props.confirmationModalIsOpen.open} onHide={props.closeConfirmationModal}>
        <Modal.Header>
        <Modal.Title>Please Confirm</Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <div>Are you sure you want to delete this question?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeConfirmationModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Delete</Button>
        </Modal.Footer>
     
    </Modal>
  )
}