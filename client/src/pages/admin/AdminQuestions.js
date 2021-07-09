import React , { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import AddQuestionModal from './AddQuestionModal';
import BackToTop from '../../components/BackToTop';
import DownToBottom from '../../components/DownToBottom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmation from './DeleteConfirmation';
import EditQuestionModal from  './EditQuestionModal';
import './AdminQuestions.scss';

export default function AdminQuestions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState({open:false,
                                                                          id: null});
  const [editModalIsOpen, setEditModalIsOpen] = useState({open: false,
                                                          area:'',
                                                          notes:'',
                                                          weight:'',
                                                          assessment:''});
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
  const openConfirmationModal = (id) => {
    setConfirmationModalIsOpen((prev) => ({...prev, open: true, id}));
  }
  const closeConfirmationModal = () => {
    setConfirmationModalIsOpen((prev) => ({...prev, open: false}));
  }
  const openEditModal = (id, area, notes, weight, assessment) => {
    setEditModalIsOpen((prev) => ({...prev, open:true, id, area, notes, weight,  assessment}));
  }
  const closeEditModal = () => {
    setEditModalIsOpen((prev) => ({...prev, open: false}));
  }

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
          placeholder="Search by Area"
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
              <th className="table-heading">Group</th>
              <th className="table-heading">Area</th>
              <th className="table-heading">Question</th>
              <th className="table-heading">Weight Factor</th>
              <th className="table-heading">Edit</th>
              <th className="table-heading">Delete</th>
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
                        <td className="question-col">{val.notes}</td>
                        <td>{val.weight}</td>
                        <td><FontAwesomeIcon id="edit-icon" style={{'color': '#037ffc'}} icon={faEdit} onClick={()=>openEditModal(val.id,area.name,val.notes,val.weight,val.assessment)}/></td>
                        <td><FontAwesomeIcon id="trash-icon" style={{'color': '#dc3545'}} icon={faTrashAlt} onClick={()=>openConfirmationModal(val.id)}/></td>
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
      {confirmationModalIsOpen.open &&
      <DeleteConfirmation
      closeConfirmationModal={closeConfirmationModal}
      confirmationModalIsOpen={confirmationModalIsOpen}/>
      }
      {editModalIsOpen.open &&
      <EditQuestionModal
      closeEditModal={closeEditModal}
      editModalIsOpen={editModalIsOpen}/>
      }
      <BackToTop showBelow={250}/>
      <DownToBottom showBelow={250}/>
    </main>
  )
}