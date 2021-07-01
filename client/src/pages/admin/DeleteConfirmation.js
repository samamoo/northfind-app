import React from 'react';
import { Modal, Col, Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default function DeleteConfirmation(props) {
  const deleteRecord = () => {
    const id = props.confirmationModalIsOpen.id;
    axios.post("http://localhost:9000/api/deleteQuestion", {id:id} )
    .then (res => {
      console.log(res, "Added new data")
      props.closeConfirmationModal();
    })
    .catch(err => {
      console.log(err);
    })
  };
  return(
    <Modal show={props.confirmationModalIsOpen.open} onHide={props.closeConfirmationModal}>
        <Modal.Header>
        <Modal.Title>Please Confirm</Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <div>Are you sure you want to delete?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteRecord}>Delete</Button>
          <Button variant="primary" onClick={props.closeConfirmationModal}>Cancel</Button>
        </Modal.Footer>
     
    </Modal>
  )
}