const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Get all interview sessions
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM interviews;`)
    .then((data) => {
      if (data) {
        res.status(200).send(data.rows[0]);
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
    return router;
  });

  // Create a new interview session
  router.post('/', (req, res) => {
    
  })
}