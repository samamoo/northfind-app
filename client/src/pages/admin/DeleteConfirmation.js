import React from 'react';
import { Modal, Col, Button, Form, FormControl } from 'react-bootstrap';

export default function DeleteConfirmation(props) {
  return(
    <Modal show={props.confirmationModalIsOpen} onHide={props.closeConfirmationModal}>
        <Modal.Header>
        <Modal.Title>Please Confirm</Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <div>Are you sure you want to delete?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >Delete</Button>
          <Button variant="primary" >Cancel</Button>
        </Modal.Footer>
     
    </Modal>
  )
}