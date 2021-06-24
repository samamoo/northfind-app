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

  const validate = () => {
    if (question.notes === '') {
      setError({...error, notes: 'You must set a question.'});
      return false;
    };
    if (question.weight === 0 || question.weight === "Select...") {
      setError({...error, weight: 'You must set a weigth factor.'});
      return false;
    };
    if (question.assessment === 0 || question.assessment === "Select...") {
      setError({...error, assessment: 'You must set an assessment value.'});
      return false;
    };
    if (question.area === '' || question.area === "Select...") {
      setError({...error, area: 'You must assign an area.'});
      return false;
    };
    if (question.group === '' || question.group === "Select...") {
      setError({...error, group: 'You must assign a group.'});
      return false;
    };
    setError({...error, notes:'', weight:'', assessment: '', group: '', area:''});
    return true;
  }

  const selection = (e) => {
    let value = 0;
    if (e.target.value === "1") {
      value = 1;
    } else if (e.target.value === "2") {
      value = 2;
    } else if (e.target.value === "3") {
      value = 3;
    } else if (e.target.value === "4") {
      value = 4;
    } else if (e.target.value === "5") {
      value = 5;
    } 
    setQuestion({...question, [e.target.name]: value})
  };

  const changeHandler = (e) => {
    setQuestion({...question, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    console.log(question)
    props.closeModal();
  }

  return(
    <Modal show={props.modalIsOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Question</Modal.Title>
      </Modal.Header>
      <Form className="form-container" style={{width: "100%"}}>
        <Modal.Body>
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" name="notes" as="textarea" autoComplete="off" rows={3} onChange={changeHandler}></Form.Control>
          <section className="register-validation">{error.notes}</section>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Weight Factor</Form.Label>
              <Form.Control name="weight" as="select" onChange={selection}>
                <option>Select...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <section className="register-validation">{error.weight}</section>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Assessment Value</Form.Label>
              <Form.Control name="assessment" as="select" onChange={selection}>
                <option>Select...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <section className="register-validation">{error.assessment}</section>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Group</Form.Label>
            <Form.Control as="select" name="group" onChange={changeHandler}>
              <option>Select...</option>
              <option>Performance Measurement</option>
              <option>Process</option>
              <option>Organization</option>
              <option>Tools</option>
            </Form.Control>
            <section className="register-validation">{error.group}</section>
          </Form.Group>
          <Form.Group>
            {/* Filter the areas available depending on the group selected */}
            <Form.Label>Area</Form.Label>
            <Form.Control as="select" name="area" onChange={changeHandler}>
              <option>Select...</option>
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
            <section className="register-validation">{error.area}</section>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}