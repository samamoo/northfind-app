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
    db.query(`DELETE FROM companies WHERE id = ($1) RETURNING *;`, [id])
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
  });
  // Edit a company
  router.post('/edit', (req, res) => {
    const company_name = req.body.companyName;
    const id = req.body.id;
    db.query(`UPDATE companies SET company_name = ($1) WHERE id = ($2) RETURNING *;`, [company_name, id])
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