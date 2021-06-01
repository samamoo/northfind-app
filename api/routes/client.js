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
  
  // Add a new client
  router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const company = req.body.companyName;
    // Get the company_id
    db.query(`SELECT id FROM companies WHERE company_name = $1`, [company])
    .then((x) => {
      const companyId = x.rows[0]
      const arrayParams = [firstName, lastName, email, companyId.id];
      // Insert new client
      db.query(
        `Insert into clients (first_name,last_name,email,company_id) values($1, $2, $3, $4);`,
        arrayParams
      )
      .then((data) => {
        res.status(200).send("Inserted")
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    })
    
  });
  // INSERT A NEW USER INTO DB
  
  return router;
}