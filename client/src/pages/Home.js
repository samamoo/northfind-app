import axios from 'axios';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Home.scss';

export default function Home () {

  // useEffect(() => {
  //   axios.get("http://localhost:9000/api/login/")
  //   .then(res => console.log(res))
  // },[])

  return (
    <div className="homepage">
      <Button href="/clientform" variant="primary" size="lg">Start New Interview</Button>{' '}
    </div>
  )
}