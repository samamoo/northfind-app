import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './Home.scss';

export default function Home (props) {

  const startSession = (e) => {
    console.log("start session")
  }

  return (
    <div className="homepage">
      <Button href="/clientform" variant="primary" size="lg" onClick={startSession} >Start New Interview</Button>{' '}
    </div>
  )
}