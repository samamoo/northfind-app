const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res, next) => {
    db.query(`SELECT * FROM groups;`)
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
  return router;
}