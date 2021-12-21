import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackToTop from '../../../components/BackToTop';
import DownToBottom from '../../../components/DownToBottom';
import axios from 'axios';
import './AdminInterviews.scss';

export default function AdminInterviews () {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState({
    clients: [],
    users: [],
    interviews: [],
    companies: [],
  });
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:9000/api/interview/'),
      axios.get('http://localhost:9000/api/company/'),
      axios.get('http://localhost:9000/api/users/'),
      axios.get('http://localhost:9000/api/clients/'),
    ]).then((all) => {
      const interviews = all[0].data;
      const companies = all[1].data;
      const users = all[2].data;
      const clients = all[3].data;
      setState((prev) => ({...prev, interviews, users, companies, clients}));
    });
  },[]);

  const filterSearch = () => {
    let results = [];
    if (searchTerm === "") {
      return state.interviews;
    }
    state.companies.forEach((company) => {
      if (company.company_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        console.log("yo")
        for (const client of state.clients) {
          let interviewsByCompany = state.interviews.filter((i) => {
            return i.client_id === client.id && company.id === client.company_id;
          })
          console.log(interviewsByCompany, "INTERVIEWS BY COMPANY")
          results = [...results, ...interviewsByCompany];

        }
      }
    })
    return results;
  };
  console.log(typeof state.interviews)
  console.log(filterSearch())
  console.log(searchTerm)
  console.log(state);
  return( state.interviews &&
    <main className="interviews-list">
      {/*  */}
      <div className="admin-client-banner">
        <h1>Interview Sessions</h1>
      </div>
      <div className="admin-client-searchbar-content">
        <p>Search:</p>
        <span>
          <input 
          className="textfield" 
          id="outlined-basic"
          variant="outlined"
          placeholder=" Search by Company Name"
          autoComplete='off' 
          onChange={event => {setSearchTerm(event.target.value)}}>
          </input> 
        </span>
      </div>
      {/*  */}
      <div className="line"></div>
      <div className="admin-questions-searchresults">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="table-heading">Client</th>
              <th className="table-heading">Date</th>
              <th className="table-heading">View Session</th>
            </tr>
          </thead>
          <tbody>
            {filterSearch().map((val, key) => {
              for (const company of state.companies) {
                for (const client of state.clients) {
                  if (val.client_id === client.id && client.company_id === company.id) {
                    return (
                      <tr key={val.id}>
                        <td>{company.company_name}</td>
                        <td>{val.created_at}</td>
                        <td><Link to={{
                          pathname: '/admin-interview', 
                          state: {val, company, client}}}>View Session</Link></td>
                        {/* Use Moment.js */}
                      </tr>
                    )
                  }
                }
              }
            })}
          </tbody>
        </table>
      </div>
      {/*  */}
      <BackToTop showBelow={250}/>
      <DownToBottom showBelow={250}/>
    </main>
  )
}

// Get all clients
// Get all users
// Get the dates of each interview