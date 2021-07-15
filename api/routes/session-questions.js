const express = require('express');
const router = express.Router();

module.exports = (db) => {


  // Create a new interview session
  router.post('/', (req, res) => {
    console.log(req.body);
   const arrayObject = req.body.sessionQuestions.questions;
   const session_id = req.body.sessionId;
   for( let val of arrayObject ) {
     const question_id = val.id;
     const comments = val.comments;
     const assessment = val.assessment;
     const score = val.score;
     const arrayParams = [question_id, session_id, comments, assessment, score];
     db.query(
      `INSERT INTO session_questions (question_id, session_id, comments, assessment, score) VALUES($1, $2, $3, $4, $5) RETURNING *`, arrayParams
    )
    .then((data) => {
      res.status(200).json(data.rows[0])
    })
    .catch((err) => {
      res.status(500).json({error: err.message});
    })
   }
    // Create a new interview session
    
  })
  return router;
}