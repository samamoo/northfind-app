import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminInterviews.scss';

export default function AdminInterviews () {
  const [state, setState] = useState({
    clients: [],
    users: [],
    interviews: [],
  })

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:9000/api/interview/'),
      axios.get('http://localhost:9000/api/company/'),
      axios.get('http://localhost:9000/api/users/'),
    ]).then((all) => {
      const interviews = all[0].data;
      const clients = all[1].data;
      const users = all[2].data;
      setState((prev) => ({...prev, interviews, users, clients}));
    });
  },[]);

  console.log(state);
  return(
    <main className="interviews-list">
      <h1>Hello</h1>
    </main>
  )
}

// Get all clients
// Get all users
// Get the dates of each interview