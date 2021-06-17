import React, { useState } from 'react';
import { Modal, Col, Button, Form, FormControl } from 'react-bootstrap';

export default function AddQuestionModal(props) {
  const [error, setError] = useState({
    notes:'',
    weight: '',
    assessment: '',
    area: '',
  })
  const [question, setQuestion] = useState({
    notes: '',
    weight: 0,
    assessment: 0,
    area: '',
    group: '',
  });



  return(
    <Modal show={props.modalIsOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Question</Modal.Title>
      </Modal.Header>
      <Form className="form-container" style={{width: "100%"}}>
        <Modal.Body>
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" name="notes" as="textarea" autoComplete="off" rows={3}></Form.Control>
          <section className="register-validation">{error.notes}</section>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Weight Factor</Form.Label>
              <Form.Control name="weight" as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Assessment Value</Form.Label>
              <Form.Control name="assessment" as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Group</Form.Label>
            <Form.Control as="select" name="group">
              <option>Performance Measurement</option>
              <option>Process</option>
              <option>Organization</option>
              <option>Tools</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            {/* Filter the areas available depending on the group selected */}
            <Form.Label>Area</Form.Label>
            <Form.Control as="select" name="area">
              <option>OTTR</option>
              <option>Forecast Accuracy</option>
              <option>MPS Attainment</option>
              <option>Schedule Adherence</option>
              <option>Supplier OTD</option>
              <option>Inventory Plan</option>
              <option>Expedited Freight</option>
              <option>Portfolio Review</option>
              <option>Demand Planning</option>
              <option>Supply Planning</option>
              <option>Reconciliation</option>
              <option>Exec-S&OP</option>
              <option>Cycle Time</option>
              <option>Organizational Alignment</option>
              <option>Training & Education</option>
              <option>Standardization & Continuous Improvement</option>
              <option>Systems Control</option>
              <option>Systems Functionality</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeModal}>Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}