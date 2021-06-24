import React , { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import AddQuestionModal from './AddQuestionModal';
import BackToTop from '../../components/BackToTop';
import axios from 'axios';
import './AdminQuestions.scss';

export default function AdminQuestions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [areas, setAreas] = useState([]);
  const [groups, setGroups] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  // Get list of interview questions
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

  // Open and Close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Filter search results
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
    // groups.forEach((group) => {
    //   if (group.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    //     let questionsByGroup = questionList.filter((q) => {
          
    //     })
    //     results = [...results, ...questionsByGroup];
    //   }
    // })
    console.log(results)
    return results;
  }

  return( questionList &&
    <main className="admin-client">
      <div className="admin-client-banner">
        <h1>Interview Questions</h1>
        <button className="btn btn-primary" onClick={openModal}>+ New Question</button>
      </div>
      <div className="admin-client-searchbar-content">
        <p>Search:</p>
        <span>
          <input 
          className="textfield" 
          id="outlined-basic"
          variant="outlined"
          placeholder="Search by Area (or Group?)"
          autoComplete='off' 
          onChange={event => {setSearchTerm(event.target.value)}}>
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
              <th>Weight Factor</th>
              <th>Assessment Value</th>
            </tr>
          </thead>
          <tbody>
            {filterSearch().map((val, key) => {
              for (const area of areas) {
                for (const group of groups) {
                  if (val.area_id === area.id && area.group_id === group.id) {
                    return (
                      <tr key={val.id}>
                        <td>{group.name}</td>
                        <td>{area.name}</td>
                        <td>{val.notes}</td>
                        <td>{val.weight}</td>
                        <td>{val.assessment}</td>
                      </tr>
                    )
                  }
                }
              }
            })}
          </tbody>
        </table>
      </div>
      {modalIsOpen &&
      <AddQuestionModal
      closeModal={closeModal}
      modalIsOpen={modalIsOpen}/>
      }
      <BackToTop showBelow={250}/>
    </main>
  )
}