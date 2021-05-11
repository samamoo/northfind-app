import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './Home.scss';

export default function Home (props) {

  return (
    <div className="homepage">
      <Button href="/clientform" variant="primary" size="lg">Start New Interview</Button>{' '}
    </div>
  )
}