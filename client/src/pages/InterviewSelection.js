import React, { useState, useEffect } from 'react';
import BackToTop from '../components/BackToTop';
import axios from 'axios';
import './InterviewSelection.scss';
import { Form, Button } from 'react-bootstrap';

export default function InterviewSelection(props) {
  const [areas, setAreas] = useState([]);
  const [groups, setGroups] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:9000/api/questions/')
    .then(res => {
      setQuestionList(res.data);
    })
  },[]);
  useEffect(() => {
    axios.get('http://localhost:9000/api/areas/')
    .then(res => {
      setAreas(res.data);
    })
  },[]);
  useEffect(() => {
    axios.get('http://localhost:9000/api/groups/')
    .then(res => {
      setGroups(res.data);
    })
  },[]);

  const changeHandler = (e) => {
    if (!selectedQuestions.includes(e.target.value)) {
      // if the value is not in the array, add it
      setSelectedQuestions(() => ([...selectedQuestions, e.target.value ]))
    } else {
      // remove it from the array
      const i = selectedQuestions.indexOf(e.target.value)
      if (i > -1) {
        selectedQuestions.splice(i, 1);
        console.log(selectedQuestions)
      }
    }
  }
  console.log(selectedQuestions, "SELECTED QUESTIONS");
  return(
    <main className="interview">
      <Form>
        <div className="interview-banner">
          <h1>Select your questions</h1>
        </div>
        <div className="interview-searchbar-content">
          <p>Search:</p>
          <span>
            <input 
            className="textfield" 
            id="outlined-basic"
            variant="outlined"
            placeholder="Search by Area (or Group?)"
            autoComplete='off' 
            >
            </input> 
          </span>
        </div>
        <div className="line"></div>
        <div className="admin-questions-searchresults">
          <table>
            <thead>
              <tr>
                <th>Group</th>
                <th>Area</th>
                <th>Question</th>
                <th>Select</th>
                {/* <th>Score</th>
                <th style={{"width": "20%"}}>Additional Notes</th> */}
              </tr>
            </thead>
            <tbody>
            {questionList.map((val, key) => {
                for (const area of areas) {
                  for (const group of groups) {
                    if (val.area_id === area.id && area.group_id === group.id) {
                      return (
                        <tr key={val.id}>
                          <td>{group.name}</td>
                          <td>{area.name}</td>
                          <td className="question-col" >{val.notes}</td>
                          <td>
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" aria-label="option 1" value={val.id} onChange={changeHandler}/>
                          </Form.Group>
                          </td>
                          {/* <td>
                          <Form.Group>
                              <Form.Control as="select" size="sm">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td style={{ "height": "100%"}}>
                            <Form.Group>
                              <Form.Text className="text-muted">
                                Additional Notes
                              </Form.Text>
                              <Form.Control as="textarea" row={4}/>
                            </Form.Group>
                          </td> */}
                        </tr>
                      )
                    }
                  }
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="interview-next py-5">
          <Button  variant="primary" type="submit">Next</Button>
        </div>
      </Form>
      <BackToTop showBelow={250}/>
    </main>
  )
}