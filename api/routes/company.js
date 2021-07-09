const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res, next) => {
    db.query(`SELECT * FROM companies ORDER BY company_name;`)
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
  // Add a new company
  router.post('/', (req, res) => {
    const company = req.body.companyName
    console.log(req.body.companyName)
    db.query(`INSERT INTO companies (company_name) VALUES ($1);`,[company])
    .then(() => {
      db.query(`SELECT * FROM companies ORDER BY company_name;`)
      .then((x) => {
        const list = x.rows;
        res.status(200).send(list)
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  // Delete a company
  router.post('/delete', (req, res) => {
    const id = req.body.id;
    console.log(id)
    db.query(`Delete from companies where id = ($1) RETURNING *;`, [id])
    .then(() => {
      db.query(`SELECT * FROM companies ORDER BY company_name;`)
      .then((data) => {
        const list = data.rows;
        res.status(200).send(list);
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })
  return router;
}