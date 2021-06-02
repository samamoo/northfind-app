import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal.js';
import axios from 'axios';
import './AdminClient.scss';

export default function AdminClient () {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyList, setCompanyList] = useState( {
    companies: []
  });

  useEffect(() => {
    axios.get('http://localhost:9000/api/company/')
    .then(res => {
      setCompanyList((prev) => ({...prev, companies: res.data}))
    })
  },[]);

  const openModal = () => {
    console.log("modal is open")
  }

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
    </main>
  )
}