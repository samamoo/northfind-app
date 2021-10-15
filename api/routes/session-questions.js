const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    let perfMeas = [];
    let process = [];
    let organization = [];
    let tools = [];
    // Performance Measurement Group
    // db.query(`SELECT * FROM session_questions
    // JOIN questions 
    // ON question_id = questions.id 
    // WHERE questions.area_id = 1
    // OR questions.area_id = 2
    // OR questions.area_id = 3
    // OR questions.area_id = 4
    // OR questions.area_id = 5
    // OR questions.area_id = 6
    // OR questions.area_id = 7
    // ORDER BY questions.area_id;`)
    // .then((data) => {
    //   perfMeas = data.rows;
    //   db.query(`SELECT * FROM session_questions
    //   JOIN questions 
    //   ON question_id = questions.id 
    //   WHERE questions.area_id = 8
    //   OR questions.area_id = 9
    //   OR questions.area_id = 10
    //   OR questions.area_id = 11
    //   OR questions.area_id = 12
    //   OR questions.area_id = 13
    //   ORDER BY questions.area_id;`)
    //   .then((b) => {
    //     process = b.rows;
    //     db.query(`SELECT * FROM session_questions
    //     JOIN questions 
    //     ON question_id = questions.id 
    //     WHERE questions.area_id = 14
    //     OR questions.area_id = 15
    //     OR questions.area_id = 16
    //     ORDER BY questions.area_id;`)
    //     .then((c) => {
    //       console.log(c.rows);
    //       organization = c.rows;
    //       db.query(`SELECT * FROM session_questions
    //       JOIN questions 
    //       ON question_id = questions.id 
    //       WHERE questions.area_id = 17
    //       OR questions.area_id = 18
    //       ORDER BY questions.area_id;`)
    //       .then((d) => {
    //         console.log(d.rows)
    //         tools = d.rows;
    //         res.status(200).send({perfMeas, process, organization, tools})
    //       })
    //     })
    //   })
    // })
    // .catch((err) => {
    //   res.status(500).json({error: err.message});
    // })

    let perfMeasQuery = db.query(`SELECT * FROM session_questions
      JOIN questions 
      ON question_id = questions.id 
      WHERE questions.area_id = 1
      OR questions.area_id = 2
      OR questions.area_id = 3
      OR questions.area_id = 4
      OR questions.area_id = 5
      OR questions.area_id = 6
      OR questions.area_id = 7
      ORDER BY questions.area_id;`)
      .then((a) => {
        perfMeas = a.rows;
        return perfMeas;
      })
  
    let processQuery = db.query(`SELECT * FROM session_questions
      JOIN questions 
      ON question_id = questions.id 
      WHERE questions.area_id = 8
      OR questions.area_id = 9
      OR questions.area_id = 10
      OR questions.area_id = 11
      OR questions.area_id = 12
      OR questions.area_id = 13
      ORDER BY questions.area_id;`)
      .then((a) => {
        process = a.rows;
        return process;
      })

    let orgQuery = db.query(`SELECT * FROM session_questions
      JOIN questions 
      ON question_id = questions.id 
      WHERE questions.area_id = 14
      OR questions.area_id = 15
      OR questions.area_id = 16
      ORDER BY questions.area_id;`)
      .then((a) => {
        organization = a.rows;
        return organization;
      })

    let toolsQuery = db.query(`SELECT * FROM session_questions
      JOIN questions 
      ON question_id = questions.id 
      WHERE questions.area_id = 17
      OR questions.area_id = 18
      ORDER BY questions.area_id;`)
      .then((a) => {
        tools = a.rows;
        return tools;
      })
  
    Promise.all([perfMeasQuery, processQuery, orgQuery, toolsQuery])
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      console.log( "rejected", error)
    })
  })

  // Create a new interview session
  router.post('/', (req, res) => {
    const arrayObject = req.body.sessionQuestions.questions;
    const length = arrayObject.length;
    const session_id = req.body.sessionId;
    for( let val of arrayObject ) {
      const question_id = val.id;
      const comments = val.comments;
      const assessment = val.assessment;
      const score = val.score;
      const arrayParams = [question_id, session_id,comments, assessment, score];
      db.query(
        `INSERT INTO session_questions (question_id, session_id, comments, assessment, score) VALUES($1, $2, $3, $4, $5) RETURNING *`, arrayParams
      )
    }
    db.query(
        `SELECT * FROM session_questions WHERE session_id = ${session_id}`
      )
      .then((data) => {
        res.status(200).json(data.rows)
      })
      .catch((err) => {
        res.status(500).json({error: err.message});
    })
  })
  return router;
}