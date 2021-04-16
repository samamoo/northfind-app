import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.scss';

export default function Profile(props) {
  console.log(props.state)
  const [cookie, setCookie] = useState({})

  useEffect(() => {
    axios.get("http://localhost:9000/api/login/")
    .then(res => console.log(res, "People"))
  },[]);

  return(
    <div>
      {cookie && 
      <main className="profilepage">
        <h1>PROFILE PAGE</h1>
        <p>hello there</p>
      </main>
      }
    </div>
  )
}