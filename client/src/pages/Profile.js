import React from 'react';
import './Profile.scss';

export default function Profile(props) {
  const user = props.state.userData;

  return(
    <div>
      <main className="profilepage">
        <h1>Your Profile</h1>
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Email: {user.email}</p>

      </main>
    </div>
  )
}