const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  router.post('/', (req, res) => {
    const id = req.body.id;
   
      db.query(
        `Delete from questions where id = ${id};`
      )
        .then((data) => {
         console.log(data);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    
  });
  return router;
}