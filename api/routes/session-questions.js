const express = require('express');
const router = express.Router();

module.exports = (db) => {


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