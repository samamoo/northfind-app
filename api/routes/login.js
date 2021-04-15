const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  // router.get('/', (req, res) => {
  //   const userId = req.session.user_id;
  //   if (userId) {
  //     db.query(
  //       `SELECT * FROM users
  //             WHERE id = $1;`,
  //       [userId]
  //     )
  //       .then((data) => {
  //         if (data) {
  //           res.status(200).send({loggedIn:true, user: data.rows[0]});
  //         } else {
  //           req.session = null;
  //           res.send(false);
  //         }
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ error: err.message });
  //       });
  //   }
  // });
  router.get('/', (req, res) => {
    if (req.session.user_id) {
      res.send({loggedIn:true, user: req.session.user_id})
    } else {
      res.send({loggedIn:false})
    }
  })
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
        const hashedPassword = data.rows[0].password;
        const bcryptCheck = bcrypt.compareSync(password, hashedPassword);
        if (bcryptCheck) {
          //set cookie with user id
          req.session.user_id = data.rows[0]; //set cookie
          console.log(req.session.user_id, "THIS IS THE COOKIE SESSION")
          res.status(200).send(req.session.user_id);
        } else {
          // wrong password
          req.session = null; //dont' set cookie
          res.send(false);
        }
      })
      // user with that email not found
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  // LOGOUT
  router.post("/logout", (req, res) => {
    req.session = null;
    return res.send("loggedOut");
  })
  return router;
};