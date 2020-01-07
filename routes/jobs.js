const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/', (req, res) => {
  console.log(req.body)
  const queryString = `SELECT * FROM jobs WHERE user_id=$1`;
  console.log(req.session.userId)
  const id = [req.session.userId];
  console.log(id)
  pool.query(queryString, id, (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length > 0) {
      res.json(results.rows)
    } else {
      console.log(results)
    }
  })
})

module.exports = router;