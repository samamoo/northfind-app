const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Get all Users
  router.get('/', function(req, res, next) {
    db.query(`SELECT * FROM clients;`)
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
  router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const company = req.body.companyName;
    const arrayParams = [firstName, lastName, email, company];
   
      db.query(
        `Insert into clients (first_name,last_name,email,company) values($1, $2, $3, $4);`,
        arrayParams
      )
        .then((data) => {
          res.status(200).send("Inserted")
         console.log(data);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    
  });
  // INSERT A NEW USER INTO DB
  
  return router;
}