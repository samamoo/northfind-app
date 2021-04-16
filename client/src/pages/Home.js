import React from 'react';
import { Button } from 'react-bootstrap';
import './Home.scss';

export default function Home (props) {
  console.log(props.userData)

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