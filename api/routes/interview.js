const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Get all interview sessions
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM interviews;`)
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
    return router;
  });

  // Create a new interview session
  router.post('/', (req, res) => {
    const clientId = req.body.clientId;
    const userId = req.body.userId;
    const arrayParams = [clientId, userId];
    // Create a new interview session
    db.query(
      `INSERT INTO interviews (client_id, user_id) VALUES($1, $2) RETURNING *`, arrayParams
    )
    .then((data) => {
      res.status(200).json(data.rows[0])
    })
    .catch((err) => {
      res.status(500).json({error: err.message});
    })
  })
  return router;
}