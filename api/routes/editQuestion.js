const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  router.post('/', (req, res) => {
    const id = req.body.id;
    const notes = req.body.question.notes;
    const weight = req.body.question.weight;
    const assessment = req.body.question.assessment;
    const area_id = req.body.question.area;
   console.log(id,notes,weight,assessment, area_id);
      db.query(
        `Update questions SET notes = '${notes}', weight = ${weight}, assessment = ${assessment}, area_id = ${area_id} where id = ${id};`
      )
        .then((data) => {
          res.status(200);
         console.log(data);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    
  });
  return router;
}