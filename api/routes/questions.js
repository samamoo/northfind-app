const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res, next) => {
    db.query(`SELECT * FROM questions;`)
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
  router.post('/', (req, res) => {
    const notes = req.body.notes;
    const weight = req.body.weight;
    const assessment = req.body.assessment;
    const area_id = req.body.area;
    const arrayParams = [notes, weight, assessment, area_id];
   
      db.query(
        `Insert into questions (notes,weight,assessment,area_id) values($1, $2, $3, $4);`,
        arrayParams
      )
        .then((data) => {
         console.log(data);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    
  });
  return router;
}