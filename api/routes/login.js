const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get('/', (req, res) => {
    const userId = req.session.user_id;
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
            req.session = null;
            res.send(false);
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });
// LOGIN
  router.post('/', (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;

    //query user from db
    db.query(
      `SELECT * FROM users
            WHERE email = $1;`,
      [email]
    )
      .then((data) => {
        console.log(data,"THE DATA")
        const hashedPassword = data.rows[0].password;
        const bcryptCheck = bcrypt.compareSync(password, hashedPassword);
        if (bcryptCheck) {
          //set cookie with user id
          req.session.user_id = data.rows[0].id;
          res.status(200).send(data.rows[0]);
        } else {
          req.session = null;
          res.send(false);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};