import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';


export default function Interview(props) {
  let temp = [];
  const [sessionQuestion, setSessionQuestion] = useState({
    questionId:null,
    sessionId:null,
    comments: '',
    score: null,
    assessment:null
  }
  );
  const [sessionQuestionList, setSessionQuestionList] = useState({
    questions: []}
  )
  
  const [redirect, setRedirect] = useState(false)

  const questionsIds = props.location.state.questions;
  const areas = props.location.state.areas;
  const groups = props.location.state.groups;
  const sessionId = props.location.state.sessionId;

 
 const handleSubmit = () => {
 
    setRedirect(!redirect);
  };
 const changeHandler = (id,e) => {
   
   for(let val of questionsIds.questions) {
     if(val.id === id){
       let score;
      if(!sessionQuestion.score && sessionQuestion.assessment) {
        score = parseInt(sessionQuestion.assessment, 10) * val.weight;
        setSessionQuestion({...sessionQuestion,score: score, sessionId: sessionId, questionId: id, [e.target.name]: e.target.value});
      } else {
        setSessionQuestion({...sessionQuestion, sessionId: sessionId, questionId: id, [e.target.name]: e.target.value});
      }
     }
   }
   if(sessionQuestion.comments !== '' || sessionQuestion.score !== null || sessionQuestion.assessment !== null) {
     temp.push(sessionQuestion);
     setSessionQuestionList((prev) => ({...prev, questions:temp}))
   }
   console.log(sessionQuestionList);
 }
 
  return(
   
    <main className="interview">
     
        <form>
      <h1>Interview Session</h1>
      <div className="line"></div>
      <div className="admin-questions-searchresults">
        <table>
        <thead>
              <tr>
                <th>Assessment</th>
                <th>Question</th>
              
              </tr>
            </thead>
          <tbody>
          <Form.Group>
          {questionsIds.questions.map((val, key) => {
                for (const area of areas) {
                  for (const group of groups) {
                    if (val.area_id === area.id && area.group_id === group.id) {
                      return (
                        <>
                        <tr key={val.id}>
                        <td>
                        <Form.Control as="select" name="assessment" onChange={(e) => changeHandler(val.id, e)}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          
                        </Form.Control>
                        </td>
                        <td className="question-col" >{val.notes}</td>
                        </tr>
                        <tr >
                        <td colSpan='2'>   
                        <Form.Control placeholder='Please write your comments here'  onChange={(e) =>changeHandler(val.id, e)} name="comments" as="input" autoComplete="off" />
                        </td>
                        </tr>
                       
                        </>
                        
                      )
                    }
                  }
                }
              })}
              </Form.Group>
          </tbody>
        </table>
      </div>
      <div className="interview-next py-5">
          <Button onClick={handleSubmit} variant="primary" type="button">Submit
          <FontAwesomeIcon id="arrow-right" style={{'margin-left': '10px'}} icon={faArrowRight}/></Button>
         
      </div>
      </form>
    </main>
  )
}