import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import './Interview.scss';

export default function Interview(props) {
 
  const [sessionQuestions, setSessionQuestions] = useState({questions:[]})
  const [redirect, setRedirect] = useState(false)

  const questionsIds = props.location.state.questions;
  const areas = props.location.state.areas;
  const groups = props.location.state.groups;
  const sessionId = props.location.state.sessionId;

 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/api/session-questions", {sessionQuestions, sessionId})
    .then ((res) => {
      setRedirect(true);
    })
    .catch(err => {
      console.log(err);
    })
    // setRedirect(!redirect);
  };
  
  const changeHandler = (id,e) => {
    let name = e.target.name;
   const sessionQuestions = questionsIds.questions.map(val => {
      if(val.id === id) {
        val[name] = e.target.value;
        if(!val['assessment']) {
          val['assessment'] = 0;
        }
        val['score'] = parseInt(val['assessment'], 10) * val.weight;
      }
      return val;
    })
    setSessionQuestions((prev) => ({...prev, questions:sessionQuestions}));
  }
 

 
  return(
   
    <main className="interview">
     
        <form>
      <h1>Interview Session</h1>
      <div className="line"></div>
      <div className="admin-questions-searchresults">
      <Form.Group>
        <table>
          <thead>
            <tr>
              <th className="table-heading">Question</th>
              <th className="table-heading">Assessment Value</th>
              <th className="table-heading">Additional Notes</th>
            
            </tr>
          </thead>
          <tbody>
          
          {questionsIds.questions.map((val, key) => {
                for (const area of areas) {
                  for (const group of groups) {
                    if (val.area_id === area.id && area.group_id === group.id) {
                      return (
                        <>
                        <tr key={val.id}>
                          <td className="question-col" >{val.notes}</td>
                          <td>
                            <Form.Group>
                              <Form.Control as="select" name="assessment" onChange={(e) => changeHandler(val.id, e)}>
                                <option>Select...</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                        <td style={{ "height": "100%", "width": "25%"}}>   
                        <Form.Control placeholder='Additional notes...'  onChange={(e) =>changeHandler(val.id, e)} name='comments' as="textarea" row={5}/>
                        </td>
                        </tr>
                        <tr >
                        </tr>
                       
                        </>
                        
                      )
                    }
                  }
                }
              })}
             
          </tbody>
        </table>
        </Form.Group>
      </div>
      <div className="interview-next py-5">
          <Button onClick={handleSubmit} variant="primary" type="button">Submit
          <FontAwesomeIcon id="arrow-right" style={{'margin-left': '10px'}} icon={faArrowRight}/></Button>
         {redirect && <Redirect to={{pathname:"/end"}}/>}
         {/* {redirect && <Redirect to={{pathname:"/pre-submit", state: { questions: sessionQuestions.questions }}}/>} */}
      </div>
      </form>
    </main>
  )
}