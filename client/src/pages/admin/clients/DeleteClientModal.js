import React from 'react';
import { Modal, Button, } from 'react-bootstrap';

export default function DeleteClientModal(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.deleteCompany(props.deleteModalIsOpen.id);
    props.closeDeleteModal();
  }
  console.log(props.deleteModalIsOpen)
  return(
    <Modal show={props.deleteModalIsOpen.open} onHide={props.closeDeleteModal}>
        <Modal.Header>
        <Modal.Title>Please Confirm</Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <div>Are you sure you want to delete <strong>{props.deleteModalIsOpen.companyName}</strong>?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeDeleteModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Delete</Button>
        </Modal.Footer>
    
    </Modal>
  )
}