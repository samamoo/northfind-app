import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export default function Confirmation(props) {
  const [selectedQuestions, setSelectedQuestions] = useState({
    questions: []}
  )
  const questionsIds = props.location.state.questions;
  const areas = props.location.state.areas;
  const groups = props.location.state.groups;
  console.log(areas);
  console.log(groups);

  useEffect(() => {
    axios.get('http://localhost:9000/api/questions/select', {params: {questionsIds}})
    .then((data) => {
      setSelectedQuestions((prev) => ({...prev, questions: data.data}))
    })
  },[]);

  return( selectedQuestions.questions &&
    <main className="interview">
      <h1>Confirmation your selected questions</h1>
      <div className="line"></div>
      <div className="admin-questions-searchresults">
        <table>
          <thead>
            <tr>
              <th>Group</th>
              <th>Area</th>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>
          {selectedQuestions.questions.map((val, key) => {
                for (const area of areas) {
                  for (const group of groups) {
                    if (val.area_id === area.id && area.group_id === group.id) {
                      return (
                        <tr key={val.id}>
                          <td>{group.name}</td>
                          <td>{area.name}</td>
                          <td className="question-col" >{val.notes}</td>
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
          <Button  variant="primary" type="button">Start Interview
          <FontAwesomeIcon id="arrow-right" style={{'margin-left': '10px'}} icon={faArrowRight}/></Button>
      </div>
    </main>
  )
}