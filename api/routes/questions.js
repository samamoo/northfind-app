const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Get all questions
  router.get('/', (req, res, next) => {
    db.query(`SELECT * FROM questions ORDER BY area_id;`)
    .then((data) => {
      if (data) {
        res.status(200).send(data.rows);
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  // Get list of selected questions
  router.get('/select', (req, res, next) => {
    const questionsIds = req.query.questionsIds;
    db.query(`SELECT * FROM questions WHERE id IN (${questionsIds}) ORDER BY area_id;`)
    .then((data) => {
      res.status(200).json(data.rows)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })
  // Insert a new question
  router.post('/', (req, res) => {
    const notes = req.body.notes;
    const weight = req.body.weight;
    const assessment = req.body.assessment;
    const area_id = req.body.area;
    const arrayParams = [notes, weight, assessment, area_id];
    db.query(
      `INSERT INTO questions (notes,weight,assessment,area_id) VALUES($1, $2, $3, $4);`,
      arrayParams
    )
    .then(() => {
      db.query(`SELECT * FROM questions ORDER BY area_id;`)
      .then((data) => {
        const list = data.rows;
        res.status(200).send(list)
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  // Delete a question
  router.post('/delete', (req, res) => {
    const id = req.body.id;
    db.query(
      `Delete from questions where id = ${id};`
    )
    .then(() => {
      db.query(`SELECT * FROM questions ORDER BY area_id;`)
      .then((data) => {
        console.log("Deleted!")
        const list = data.rows;
        res.status(200).send(list);
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  return router;
}