import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
// import Modal from 'react-modal';
import axios from 'axios';
import './AdminClient.scss';
import AddClientModal from './AddClientModal';

export default function AdminClient () {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [companyList, setCompanyList] = useState( {
    companies: []
  });

  useEffect(() => {
    axios.get('http://localhost:9000/api/company/')
    .then(res => {
      setCompanyList((prev) => ({...prev, companies: res.data}))
    })
  },[]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
  const addNewCompany = (company) => {
    console.log(company,"received")
  }

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
      <div className="admin-client-searchresults">
        {filterSearch().map((val,key) => {
          return(
            <p key={val.id}>{val.company_name}</p>
          )
        })}
      </div>
        {modalIsOpen && 
          <AddClientModal 
          closeModal={closeModal} 
          modalIsOpen={modalIsOpen}
          onSave={addNewCompany}/>
        }
    </main>
  )
}