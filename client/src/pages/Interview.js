import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Interview.scss';

export default function InterviewSession(props) {
  const [areas, setAreas] = useState([]);
  const [groups, setGroups] = useState([]);
  const [questionList, setQuestionList] = useState([]);
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

  return(
    <main className="interview">
      <div className="interview-banner">
        <h1>Interview Session</h1>
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
              <th>Score</th>
              <th>Additional Notes</th>
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
                        <td>{val.notes}</td>
                        <td>Stuff</td>
                        <td>Text Field</td>
                      </tr>
                    )
                  }
                }
              }
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}