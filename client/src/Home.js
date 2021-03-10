import React from 'react';
import { Button } from 'react-bootstrap';
import './Home.scss';

export default function Home () {
  return (
    <div className="homepage">
      <Button href="#" variant="info" size="lg">Start New Interview</Button>{' '}
    </div>
  )
}