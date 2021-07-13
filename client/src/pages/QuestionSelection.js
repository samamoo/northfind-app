import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import BackToTop from '../components/BackToTop';
import DownToBottom from '../components/DownToBottom';
import axios from 'axios';
import './QuestionSelection.scss';

export default function QuestionSelection(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [areas, setAreas] = useState([]);
  const [groups, setGroups] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('')
  const sessionId = props.location.state.session_id;
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

  const validate = () => {
    if (selectedQuestions.length < 1) {
      setError('You must select at least 1 questions for the interview session');
      return false;
    }
    setError('');
    return true;
  }

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    console.log("SUBMIT")
    setRedirect(true);
  }

  const filterSearch = () => {
    let results = [];
    if (searchTerm === "") {
      return questionList;
    }
    areas.forEach((area) => {
      if (area.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        let questionsByArea = questionList.filter((q) => {
          return q.area_id === area.id;
        })
        results = [...results, ...questionsByArea];
      }
    })
    return results;
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
            placeholder="Search by Area"
            autoComplete='off'
            onChange={event => {setSearchTerm(event.target.value)}} 
            >
            </input> 
          </span>
        </div>
        <div className="line"></div>
        <div className="admin-questions-searchresults">
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Group</th>
                <th>Area</th>
                <th>Question</th>
                {/* <th>Score</th>
                <th style={{"width": "20%"}}>Additional Notes</th> */}
              </tr>
            </thead>
            <tbody>
            {filterSearch().map((val, key) => {
                for (const area of areas) {
                  for (const group of groups) {
                    if (val.area_id === area.id && area.group_id === group.id) {
                      return (
                        <tr key={val.id}>
                          <td>
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" aria-label="option 1" value={val.id} onChange={changeHandler}/>
                          </Form.Group>
                          </td>
                          <td>{group.name}</td>
                          <td>{area.name}</td>
                          <td className="question-col" >{val.notes}</td>
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
          <section className="register-validation">{error}</section>
          <Button  variant="primary" type="submit" onClick={handleSubmit}>Next
          <FontAwesomeIcon id="arrow-right" style={{'margin-left': '10px'}} icon={faArrowRight}/></Button>
          {/* if selectedQuestions != [], set redirect to true, else set error */}
          { redirect && <Redirect to={{pathname:"/confirmation", state: { questions: selectedQuestions, areas, groups, sessionId}}}/>}
        </div>
      </Form>
      <BackToTop showBelow={250}/>
      <DownToBottom showBelow={250}/>
    </main>
  )
}