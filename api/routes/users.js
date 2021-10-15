const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  // Get all Users
  router.get('/', function(req, res, next) {
    db.query(`SELECT * FROM users;`, [])
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
  
  // Get a User by ID
  router.get('/:id', (req, res) => {
    const userId = req.params.id;
    if (userId) {
      db.query(
        `SELECT * FROM users
              WHERE id = $1;`,
        [userId]
      )
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
    }
  });
  // INSERT A NEW USER INTO DB
  router.post('/', (req, res) => {
    console.log(req.body)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    db.query(
      `SELECT * FROM users
              WHERE email = $1;`,
      [email]
    ).then((data) => {
      console.log(data,"other data")
      if (data.rows[0] !== undefined) {
        return res.send('exists');
      }
      console.log("They don't exist")
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log(hashedPassword, "hashedpw")
      const queryParams = [firstName, lastName, email, hashedPassword];
      console.log(queryParams, "queryParams")
      db.query(
        `INSERT INTO users (first_name, last_name, email, password)
              VALUES ($1, $2, $3, $4)
              RETURNING *;`,
        queryParams
      )
      .then((data) => {
        console.log(data,"thedata")
        const listing = data.rows[0];
          return res.status(200).send(listing);
      })
      .catch((err) => {
        return res.status(500).send('error');
      });
    })
  })
  return router;
}