import React, { useState } from 'react';
import './PreSubmit.scss';

export default function PreSubmit(props) {
  const [questions, setQuestions] = useState(props.location.state.questions)
  console.log(questions)
  return(
    <main className="interview">
      <h1>PRE SUBMISSION Here</h1>
      <div className="line"></div>
      <div className="admin-questions-searchresults">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="table-heading">ID</th>
              <th className="table-heading">Area ID</th>
              <th className="table-heading">Notes</th>
              <th className="table-heading">Score</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((val, key) => {
              return (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.area_id}</td>
                  <td className="question-col">{val.notes}</td>
                  <td>{val.score}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}