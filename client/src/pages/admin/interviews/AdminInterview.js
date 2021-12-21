import React from 'react';

export default function AdminInterview (props) {
  const company = props.location.state.company;
  const client = props.location.state.client;
  const session = props.location.state.val;

  return (
    <main className="interviews-list">
      <h1>Interview Details</h1>
      <hr/>
      <p>Client Interviewed: {client.first_name} {client.last_name}</p>
      <p>Client Email: {client.email}</p>
      <p>Company: {company.company_name}</p>
      <p>Date: {session.created_at}</p>
    </main>
  )
}