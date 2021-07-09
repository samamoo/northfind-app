import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './AdminClient.scss';
import AddClientModal from './AddClientModal';
import DeleteClientModal from './DeleteClientModal';
import BackToTop from '../../../components/BackToTop';
import DownToBottom from '../../../components/DownToBottom';

export default function AdminClient () {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState({
    open: false,
    id: null,
  });
  const [companyList, setCompanyList] = useState( {
    companies: []
  });

  // Get list of companies
  useEffect(() => {
    axios.get('http://localhost:9000/api/company/')
    .then(res => {
      console.log("Update")
      setCompanyList((prev) => ({...prev, companies: res.data}))
    })
  },[]);

  // Open and Close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  // Open and Close Delete modal
  const openDeleteModal = (id) => {setDeleteModalIsOpen((prev) => ({...prev, open: true, id}))};
  const closeDeleteModal = () => setDeleteModalIsOpen(false);

  // Filter the search results
  const filterSearch = () => {
    let results = [];
    if (searchTerm === "") {
      results = companyList.companies;
      return results;
    }
    companyList.companies.forEach((company) => {
      if (company.company_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(company)
      }
    })
    return results;
  }
  // Submit a new company and update companyList
  const addNewCompany = (company) => {
    axios.post("http://localhost:9000/api/company/", company )
    .then((res) => {
      const newList = res.data;
      setCompanyList((prev) => ({...prev, companies: newList}))
    })
    .catch((err) => {
      console.log(err);
    })
  };
  const deleteCompany = (id) => {
    axios.post("http://localhost:9000/api/company/delete", {id} )
    .then ((res) => {
      const newList = res.data;
      setCompanyList((prev) => ({...prev, companies: newList}))
    })
    .catch(err => {
      console.log(err);
    })
  };

  return(
    <main className="admin-client">
      <div className="admin-client-banner">
        <h1>Clients</h1>
        <button className="btn btn-primary" onClick={openModal}>+ New Client</button>
      </div>

      <div className="admin-client-searchbar-content">
        <p>Search:</p>
        <span>
          <input 
          className="textfield" 
          id="outlined-basic"
          variant="outlined"
          placeholder="Search by name"
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
              <th className="table-heading">Name</th>
              <th className="table-heading">Edit</th>
              <th className="table-heading">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterSearch().map((val,key) => {
              return(
                <tr>
                  <td key={val.id}>{val.company_name}</td>
                  <td style={{'width': '10%'}}><FontAwesomeIcon id="edit-icon" style={{'color': '#037ffc'}} icon={faEdit}/></td>
                  <td style={{'width': '10%'}}><FontAwesomeIcon id="trash-icon" style={{'color': '#dc3545'}} icon={faTrashAlt} onClick={() => openDeleteModal(val.id)}/></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
        {deleteModalIsOpen &&
          <DeleteClientModal 
          closeDeleteModal={closeDeleteModal}
          deleteModalIsOpen={deleteModalIsOpen}
          deleteCompany={deleteCompany}/>
        }
        {modalIsOpen && 
          <AddClientModal 
          closeModal={closeModal} 
          modalIsOpen={modalIsOpen}
          addNewCompany={addNewCompany}/>
        }
        <BackToTop showBelow={250}/>
        <DownToBottom showBelow={250}/>
    </main>
  )
}